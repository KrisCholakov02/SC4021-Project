import numpy as np
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset, load_metric
import torch
# Load the tokenizer and model
model_directory = 'results/checkpoint-2500'  # Adjust this to the path where your model is saved
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained(model_directory)

# Load and preprocess the test dataset
dataset = load_dataset("imdb")
test_dataset = dataset["test"]

def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True, max_length=256)

test_tokenized = test_dataset.map(tokenize_function, batched=True)

# Load the metric
metric = load_metric("accuracy")

# Define the evaluation function
def evaluate(batch):
    labels = batch['label']
    inputs = {k: v for k, v in batch.items() if k in tokenizer.model_input_names}
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predictions = np.argmax(logits, axis=-1)
    metric.add_batch(predictions=predictions, references=labels)

# Apply the evaluation function over the whole test dataset
test_tokenized.set_format(type='torch', columns=['input_ids', 'token_type_ids', 'attention_mask', 'label'])
test_tokenized.map(evaluate, batched=True, batch_size=8)

# Compute and print the final result
final_score = metric.compute()
print(f"Accuracy: {final_score['accuracy']}")
