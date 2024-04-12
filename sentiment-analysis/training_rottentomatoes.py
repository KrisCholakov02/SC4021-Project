# Step 1: Install Required Libraries
# You should run this command in your terminal or as part of your setup script.
# pip install torch transformers datasets sklearn

# Step 2: Import Libraries
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset
from sklearn.model_selection import train_test_split
import numpy as np
from datasets import load_metric

# Step 3: Load and Preprocess the Dataset
dataset = load_dataset("rotten_tomatoes")
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Function to tokenize the dataset
def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True, max_length=256)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Step 4: Prepare the Dataset
small_train_dataset = tokenized_datasets["train"].shuffle(seed=42).select(range(1000)) # Using a smaller subset for speed
small_eval_dataset = tokenized_datasets["test"].shuffle(seed=42).select(range(1000))

# Step 5: Configure BERT Model
model = BertForSequenceClassification.from_pretrained('results_3epoch/checkpoint-375', num_labels=2)

# Step 6: Training Arguments, adjusted for updated API
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=20,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    evaluation_strategy="epoch",  # Adjusted to use the updated argument
    save_strategy="epoch",
    load_best_model_at_end=True,
)

# Step 7: Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=small_train_dataset,
    eval_dataset=small_eval_dataset,
)

# Step 8: Train the Model
trainer.train()

# Step 9: Evaluate the Model
eval_result = trainer.evaluate()
print(f"Evaluation results: {eval_result}")
