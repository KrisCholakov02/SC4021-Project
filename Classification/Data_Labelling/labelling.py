from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax
import csv

# Path to your CSV file
csv_file_path = 'comments.csv' #path of csv file for sentiment detection


        

# Preprocess text (username and link placeholders)
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)
MODEL = f"cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
# PT
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

with open(csv_file_path, mode='r', encoding='utf-8') as file:
    # Create a CSV reader object
    csv_reader = csv.DictReader(file)
    
    # Iterate through each row in the CSV
    count = 0
    new_data = []
    for row in csv_reader:
        if count == 2000:
            break
        # Assuming you know the column names, for example 'Name' and 'Age'
        
        if count >=0:
            author = row['author']
            text = row['body']
            try: 
                
                
        #model.save_pretrained(MODEL)

                text = preprocess(text)
                encoded_input = tokenizer(text, return_tensors='pt')
                output = model(**encoded_input)
                scores = output[0][0].detach().numpy()
                scores = softmax(scores)
                ranking = np.argsort(scores)
                ranking = ranking[::-1]
                
                l = config.id2label[ranking[0]]
                print(f"{l}")
                new_data.append({'author':author,'body':text,'sentiment':l})
                print(f"count : {count}")
            except RuntimeError as error:
                if "The expanded size of the tensor" in str(error) and \
                "must match the existing size" in str(error):
                    l = ""
                    new_data.append({'author':author,'body':text,'sentiment':l})
                    count+=1
                    continue
        count+=1
        
new_csv_file_path = "" #path of csv file for saving
fieldnames = ["author", "body", "sentiment"]
with open(new_csv_file_path, mode='w', encoding='utf-8', newline='') as file:
    # Create a DictWriter object with the necessary fieldnames
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # Write the header (column names)
    writer.writeheader()
    
    # Write the rows of data
    writer.writerows(new_data)