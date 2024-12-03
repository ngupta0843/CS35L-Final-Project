import warnings

# Ignore specific warnings
warnings.filterwarnings("ignore", category=UserWarning, message="TypedStorage is deprecated")
warnings.filterwarnings("ignore", category=FutureWarning, message="`clean_up_tokenization_spaces` was not set")
warnings.filterwarnings("ignore", category=UserWarning, message="Hardware accelerator e.g. GPU is available")

import numpy as np
import sys
import torch
from transformers import pipeline
import argparse
import os
import random
from copy import deepcopy

dir_path = os.path.dirname(os.path.realpath(__file__))

# Argument parsing
parser = argparse.ArgumentParser()
parser.add_argument("data", type=str, help="The additional context to add to the fitness conversation.")
parser.add_argument("fitness_goal", choices=['w', 'd'], help="Fitness goal: 'w' for workout, 'd' for diet.")
args = parser.parse_args()

data = args.data
fitness_goal = args.fitness_goal

questions = []
context_file_path = dir_path + "/"

if fitness_goal == "w":
    context_file_path += "workout.txt"
    questions.append(f"Provide the best exercise to train these muscles: {data}")
    questions.append(f"What is the most effective exercise to target these muscles: {data}")
    questions.append(f"Can you recommend the best exercise for strengthening these muscles: {data}")
    questions.append(f"Which exercise would be most beneficial for training these muscles: {data}")
    questions.append(f"What is the optimal exercise to work these muscles: {data}")
    questions.append(f"Could you suggest the top exercise to focus on these muscles: {data}")
elif fitness_goal == "d":
    context_file_path += "diet.txt"
    questions.append(f"Based on these diet interests: {data}, what meal plan would you recommend?")
    questions.append(f"What types of recipes would align with these dietary categories: {data}?")
    questions.append(f"Can you suggest dishes that match the following dietary preferences: {data}?")
    questions.append(f"Considering these diet interests: {data}, what would be a suitable meal plan?")
    questions.append(f"What dishes or recipes would you recommend for someone with these dietary goals: {data}?")

context = ""
possible_answers = set()
#reading the context file line by line
with open(context_file_path, "r") as file:
    for line in file:
        context += line
        for options in line.strip().split(":")[1].split(","):
            if options[0] == " ":
                options = options[1:]
            if options[-1] == " ":
                options = options[:-1]
            possible_answers.add(options)

model_name = "Intel/dynamic_tinybert"

# Check if CUDA (GPU) is available
device = 0 if torch.cuda.is_available() else -1

# Set the device in the pipeline
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name, device=device)
answers = set()
for i in questions:
    res = nlp(question=i, context=context)
    answers.add(res["answer"])
answers_copy = deepcopy(answers)
for i in answers_copy:
    if i not in possible_answers:
        answers.remove(i)
total = 30
reps = [2, 3, 5, 6, 10, 15]
to_thirty = [True, False]
final_answers = []
for i in answers:
    rep_selection = random.choice(reps)
    final_answers.append((
                        str(30 // rep_selection) + " sets of " + str(rep_selection) + " reps" + " of " + i if (random.choice(to_thirty)) 
                        else i + " until failure for " + str(rep_selection) + " reps") 
                        if fitness_goal == "w" else i)
final_answers_copy = deepcopy(final_answers)
for i in final_answers_copy:
    if not i[0].isdigit() and i[0].islower():
        temp = i[0].upper() + i[1:]
        final_answers.remove(i)
        final_answers.append(temp)
print(set(final_answers))
