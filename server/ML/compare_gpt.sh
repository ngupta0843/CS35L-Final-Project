#!/bin/bash

PROMPT="I would like to workout my back and shoulder muscles in a new workout please"

# Run gpt.py and capture both output and time
echo "Running gpt.py..."
GPT_OUTPUT=$(python3 gpt.py "$PROMPT" "w")
GPT_TIME=$( (time python3 gpt.py "$PROMPT" "w") 2>&1)

# Run parallelized_gpt.py and capture both output and time
echo "Running parallelized_gpt.py..."
PARALLELIZED_GPT_OUTPUT=$(python3 parallelized_gpt.py "$PROMPT" "w")
PARALLELIZED_GPT_TIME=$( (time python3 parallelized_gpt.py "$PROMPT" "w") 2>&1)

# Extracting the real time from the outputs using grep and awk
GPT_REAL_TIME=$(echo "$GPT_TIME" | grep real | awk '{print $2}')
PARALLELIZED_GPT_REAL_TIME=$(echo "$PARALLELIZED_GPT_TIME" | grep real | awk '{print $2}')

# Print time results
echo ""
echo "Comparison of execution times:"
echo "----------------------------"
echo "gpt.py: $GPT_REAL_TIME"
echo "parallelized_gpt.py: $PARALLELIZED_GPT_REAL_TIME"

# Print the outputs of the Python scripts
echo ""
echo "Output from gpt.py:"
echo "$GPT_OUTPUT"

echo ""
echo "Output from parallelized_gpt.py:"
echo "$PARALLELIZED_GPT_OUTPUT"