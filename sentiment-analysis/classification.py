from transformers import BertTokenizer, BertForSequenceClassification
import torch
import torch.nn.functional as F  # for softmax
import pandas as pd

def classify_text(model, tokenizer, text):
    try:
        # Tokenize the text
        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        
        # Check if the token count exceeds 512
        if len(inputs['input_ids'][0]) > 512:
            # If it does, return empty strings for both the class and confidence
            return "", ""

        # Move tensors to GPU if available
        if torch.cuda.is_available():
            inputs = {key: val.to('cuda') for key, val in inputs.items()}
            model.to('cuda')

        # Predict using the model
        with torch.no_grad():
            outputs = model(**inputs)

        # Convert logits to probabilities
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        predicted_class = probabilities.argmax(-1).item()
        confidence_level = probabilities.max(dim=-1).values.item()

        return predicted_class, confidence_level
    except Exception as e:
        # Handle any other exception that may occur
        print(f"An error occurred: {e}")
        return "", ""

# Load the CSV file
df = pd.read_csv("") #download from drive

# Specify your model
model_name = 'bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained("results_1imdb/checkpoint-2500") #download from drive

# Create new columns in the DataFrame for storing results
df['Predicted_Class'] = ''
df['Confidence_Level'] = ''

# Define labels if your model is a binary classifier
Labels = ['Negative', 'Positive']

# Classify each row and store the results
count=0
for index, row in df.iterrows():
    count+=1
    try:
        predicted_class, confidence = classify_text(model, tokenizer, row['body'])  # Adjust column name as needed
        df.at[index, 'Predicted_Class'] = Labels[predicted_class] if predicted_class != "" else "Unknown"
        df.at[index, 'Confidence_Level'] = f"{confidence:.4f}" if confidence != "" else ""
    except Exception as e:
        print(f"An error occurred while processing row {index}: {e}")
        # Save progress to a temporary CSV in case of an error
        df.to_csv('partial_classified_comments.csv', index=False)
        raise e  # Optionally re-raise the exception if you want the script to stop here
    print(f"{count} {Labels[predicted_class]}")
# Save the updated DataFrame to a new CSV file
df.to_csv('classified_comments.csv', index=False)

print("Classification complete and results saved to 'classified_comments.csv'.")
