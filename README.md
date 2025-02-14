# SC4021 - Opinion Search Engine (OSE)

## 📌 Project Overview
The **Opinion Search Engine (OSE)** is designed to help users efficiently retrieve and analyze public opinions on **Virtual Reality (VR) and Augmented Reality (AR) headsets** from **Reddit**. By integrating **Natural Language Processing (NLP)** and **Machine Learning (ML)**, the system classifies sentiments and provides insightful results on user discussions.

## 🎯 Key Features
- **Reddit Data Crawling:** Extracts discussions from relevant VR/AR subreddits.
- **Advanced Text Processing:** 
  - Tokenization, stemming, and stopword removal.
  - Phonetic encoding and synonym expansion.
  - Spell-checking and character normalization.
- **Apache Solr-Based Search Engine:**
  - Fast and scalable indexing and querying.
  - Ranking enhancements for improved search accuracy.
- **Interactive Web Application:**
  - Built with **Next.js, Tailwind CSS, and React**.
  - User-friendly interface with search filters, sorting, and sentiment visualization.
- **Machine Learning-Based Sentiment Analysis:**
  - Uses an **ensemble of RoBERTa models** fine-tuned on Twitter, IMDb, and Rotten Tomatoes datasets.
  - Sentiment classification with **precision, recall, and F1 score evaluations**.

## 🛠️ Technologies Used
### Backend & Search Engine
- **Apache Solr** for indexing and querying.
- **Python (PRAW API, Pandas)** for data crawling.
- **Machine Learning Models (RoBERTa)** for sentiment classification.

### Web Application
- **Next.js & React** for frontend development.
- **Tailwind CSS & Material Tailwind** for styling.
- **Plotly.js** for data visualization.

## 🌟 Novelty & Innovation
- **Fine-Tuned Sentiment Classifier:** Utilized **multi-dataset fine-tuning** to improve sentiment analysis accuracy on **Reddit discussions**.
- **Custom Query Expansion Techniques:** Implemented **synonym expansion, stemming, and phonetic encoding** to enhance search relevance.
- **Three-Tier Query Strategy:** Ensured **strongly related** search results by dynamically adjusting search precision.
- **Integrated Spell Checking & Sentiment Visualization:** Enabled interactive user experience with **intelligent query suggestions** and **insightful sentiment distribution plots**.

## 📂 Project Structure
```
📁 4021_OSE
 ├── 📂 reddit-scrape        # Reddit data extraction & cleaning
 ├── 📂 solr/solr-9.5.0      # Apache Solr indexing & querying
 ├── 📂 web_app              # Next.js frontend implementation
 ├── 📂 classification       # Sarcasm detection
 ├── 📂 sentiment-analysis   # RoBERTa-based sentiment analysis
 ├── README.md               # Project documentation
```

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/OSE_Project.git
cd OSE_Project
```

### 2️⃣ Set Up Apache Solr
```bash
# Install Solr
wget https://downloads.apache.org/lucene/solr/8.11.1/solr-8.11.1.tgz
tar -xvzf solr-8.11.1.tgz
solr-8.11.1/bin/solr start
```

### 3️⃣ Install Dependencies
```bash
pip install praw pandas scikit-learn
npm install next react tailwindcss plotly
```

### 4️⃣ Run the Web Application
```bash
cd web_app
npm run dev
```

## 📊 Performance Metrics
| Metric         | Value |
|---------------|-------|
| **Corpus Size** | 94,130 comments |
| **Words Processed** | 9M+ |
| **Sentiment Classifier F1 Score** | 0.713 |
| **Indexing Query Speed** | ~8ms |
| **Classification Speed** | ~102 records/sec |

## 📜 References & Resources
- **Apache Solr:** [https://solr.apache.org](https://solr.apache.org)
- **HuggingFace RoBERTa Model:** [https://huggingface.co](https://huggingface.co)
- **Project Video Demo:** [YouTube Link](https://youtu.be/P68TdXkUfHA)

## 🏆 Contributors
- **Kristiyan Cholakov**
- **Haja Kiyasudeen Nusrath Hajara**
- **T. Daranidarran**
- **Ma Chunyou**
- **Rayudu Abhiteja Phani**
- **Wu Rongxi**
