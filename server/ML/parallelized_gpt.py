import warnings
import numpy as np
import sys
import torch
from transformers import pipeline
import argparse
import os
import random
from copy import deepcopy
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
import threading

# Ignore unnecessary warnings
warnings.filterwarnings("ignore", category=UserWarning, message="TypedStorage is deprecated")
warnings.filterwarnings("ignore", category=FutureWarning, message="`clean_up_tokenization_spaces` was not set")
warnings.filterwarnings("ignore", category=UserWarning, message="Hardware accelerator e.g. GPU is available")

# Get directory path
dir_path = os.path.dirname(os.path.realpath(__file__))

# Arg parsing
parser = argparse.ArgumentParser()
parser.add_argument("data", type=str, help="The additional context to add to the fitness conversation.")
parser.add_argument("fitness_goal", choices=['w', 'd'], help="Fitness goal: 'w' for workout, 'd' for diet.")
args = parser.parse_args()

data = args.data
fitness_goal = args.fitness_goal

# Initialize questions and context file path
questions = []
context_file_path = dir_path + "/"

if fitness_goal == "w":
    context_file_path += "workout.txt"
    questions.extend([
        f"Provide the best exercise to train these muscles: {data}",
        f"What is the most effective exercise to target these muscles: {data}",
        f"Can you recommend the best exercise for strengthening these muscles: {data}",
        f"Which exercise would be most beneficial for training these muscles: {data}",
        f"What is the optimal exercise to work these muscles: {data}",
        f"Could you suggest the top exercise to focus on these muscles: {data}"
    ])
elif fitness_goal == "d":
    context_file_path += "diet.txt"
    questions.extend([
        f"Based on these diet interests: {data}, what meal plan would you recommend?",
        f"What types of recipes would align with these dietary categories: {data}?",
        f"Can you suggest dishes that match the following dietary preferences: {data}?",
        f"Considering these diet interests: {data}, what would be a suitable meal plan?",
        f"What dishes or recipes would you recommend for someone with these dietary goals: {data}?"
    ])

context = ""
possible_answers = set()

# Lock to protect shared resources
lock = threading.Lock()

# Parallelize context file reading
def read_context_file_chunk(file_path, start, end):
    local_context = ""
    local_answers = set()
    
    with open(file_path, "r") as file:
        file.seek(start)
        chunk = file.read(end - start)
        lines = chunk.splitlines()
        
        for line in lines:
            line = line.strip()
            
            if ":" in line:
                parts = line.split(":", 1)
                if len(parts) > 1:
                    options_part = parts[1].strip()
                    
                    for options in options_part.split(","):
                        options = options.strip()
                        if options:
                            local_answers.add(options)

            local_context += line + "\n" 

    return local_context, local_answers

# Function to divide file reading into chunks and read in parallel
def parallel_read_context_file(file_path, num_chunks=4):
    file_size = os.path.getsize(file_path)
    chunk_size = file_size // num_chunks
    futures = []
    context_parts = []
    answers_parts = []

    with ThreadPoolExecutor(max_workers=num_chunks) as executor:
        for i in range(num_chunks):
            start = i * chunk_size
            end = start + chunk_size if i != num_chunks - 1 else file_size
            futures.append(executor.submit(read_context_file_chunk, file_path, start, end))

        for future in as_completed(futures):
            context_part, answers_part = future.result()
            context_parts.append(context_part)
            answers_parts.append(answers_part)

    global context, possible_answers
    context = ''.join(context_parts)
    possible_answers = set.union(*answers_parts)

# Parallelize Q&A
def ask_question(question, nlp, context):
    return nlp(question=question, context=context)

model_name = "Intel/dynamic_tinybert"
device = 0 if torch.cuda.is_available() else -1
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name, device=device)

parallel_read_context_file(context_file_path)

answers = set()
with ThreadPoolExecutor(max_workers=8) as executor:
    future_to_question = {executor.submit(ask_question, q, nlp, context): q for q in questions}
    for future in as_completed(future_to_question):
        question = future_to_question[future]
        try:
            res = future.result()
            if "answer" in res:
                answers.add(res["answer"])
        except Exception as e:
            print(f"Error answering question: {question}, error: {e}")

# Filter answers based on possible answers
answers_copy = deepcopy(answers)
for ans in answers_copy:
    if ans not in possible_answers:
        answers.remove(ans)

# Final processing of answers for workout or diet
total = 30
reps = [2, 3, 5, 6, 10, 15]
to_thirty = [True, False]
final_answers = []

def format_answer(answer):
    rep_selection = random.choice(reps)
    if fitness_goal == "w":
        return (str(30 // rep_selection) + " sets of " + str(rep_selection) + " reps" + " of " + answer
                if (random.choice(to_thirty))
                else answer + " until failure for " + str(rep_selection) + " reps")
    else:
        return answer

# Parallelize final answer formatting
with ThreadPoolExecutor(max_workers=8) as executor:
    formatted_answers_futures = {executor.submit(format_answer, ans): ans for ans in answers}
    for future in as_completed(formatted_answers_futures):
        formatted_answer = future.result()
        final_answers.append(formatted_answer)

final_answers_copy = deepcopy(final_answers)
for ans in final_answers_copy:
    if not ans[0].isdigit() and ans[0].islower():
        temp = ans[0].upper() + ans[1:]
        final_answers.remove(ans)
        final_answers.append(temp)

print(set(final_answers))
