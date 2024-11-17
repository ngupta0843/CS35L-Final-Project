"""
pip3 install torch transformers
git clone https://github.com/gpt-omni/mini-omni2.git
cd mini-omni2
pip install -r requirements.txt
"""
import numpy as np
import sys
import torch
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
import argparse

# Argument parsing
parser = argparse.ArgumentParser()
parser.add_argument("data", type=str, help="The additional context to add to the fitness conversation.")
parser.add_argument("fitness_goal", choices=['w', 'd'], help="Fitness goal: 'w' for workout, 'd' for diet.")
args = parser.parse_args()

data = args.data
fitness_goal = args.fitness_goal

questions = []
context_file_path = ""

if fitness_goal == "w":
    context_file_path = "workout.txt"
    questions.append(f"Provide the best exercise to train these muscles: {data}")
    questions.append(f"What is the most effective exercise to target these muscles: {data}")
    questions.append(f"Can you recommend the best exercise for strengthening these muscles: {data}")
    questions.append(f"Which exercise would be most beneficial for training these muscles: {data}")
    questions.append(f"What is the optimal exercise to work these muscles: {data}")
    questions.append(f"Could you suggest the top exercise to focus on these muscles: {data}")
elif fitness_goal == "d":
    context_file_path = "diet.txt"
    questions.append(f"Based on these diet interests: {data}, what meal plan would you recommend?")
    questions.append(f"What types of recipes would align with these dietary categories: {data}?")
    questions.append(f"Can you suggest dishes that match the following dietary preferences: {data}?")
    questions.append(f"Considering these diet interests: {data}, what would be a suitable meal plan?")
    questions.append(f"What dishes or recipes would you recommend for someone with these dietary goals: {data}?")

context = ""
with open(context_file_path, "r") as f:
    context = f.read()

model_name = "Intel/dynamic_tinybert"

nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
answers = set()
for i in questions:
    res = nlp(question=i, context=context)
    answers.add(res["answer"])
print(answers)