from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset
import numpy as np
from datasets import load_metric

# Load and preprocess the dataset
raw_ds = load_dataset("gxb912/large-twitter-tweets-sentiment")
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

def preprocess_function(examples):
    return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=128)

# Tokenize all texts and add labels column
tokenized_ds = raw_ds.map(preprocess_function, batched=True)
tokenized_ds = tokenized_ds.rename_column("sentiment", "labels") # Assuming "sentiment" is the correct label column name
tokenized_ds.set_format(type="torch", columns=['input_ids', 'attention_mask', 'labels'])

# Splitting datasets
small_train_dataset = tokenized_ds["train"].shuffle(seed=42).select(range(1000)) # Smaller subset for training
small_eval_dataset = tokenized_ds["test"].shuffle(seed=42).select(range(1000))  # Smaller subset for evaluation

# Prepare the BERT model
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3) # Assuming 3 sentiment labels: negative, neutral, positive

# Training arguments, adjusted for updated API
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=20,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=small_train_dataset,
    eval_dataset=small_eval_dataset,
)

# Train the model
trainer.train()

# Evaluate the model
eval_result = trainer.evaluate()
print(f"Evaluation results: {eval_result}")
