# 🚀 RAG Explorer - Retrieval-Augmented Generation Application

A complete end-to-end Retrieval-Augmented Generation (RAG) system built with React, Flask, ChromaDB, and Groq LLM.

## 📋 Features

- **PDF Upload & Processing**: Upload PDF documents and automatically process them
- **Intelligent Chunking**: Smart text splitting with overlap for better context preservation
- **Vector Embeddings**: Generate embeddings using Nomic Embed (via sentence-transformers)
- **Local Vector Database**: Store and retrieve embeddings using ChromaDB
- **Advanced Search**: Similarity-based retrieval of relevant document chunks
- **LLM Integration**: Use Groq API with Mixtral or Llama models for answer generation
- **Modern UI**: Beautiful React frontend with real-time processing feedback

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Port 3000)               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PDF Upload   │  │ Query Input  │  │ Document     │     │
│  │ Interface    │  │ Box          │  │ Management   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘     │
│         │                 │                                  │
├─────────┴─────────────────┴──────────────────────────────────┤
│              HTTP/REST API (Port 5000)                      │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Flask Backend Server                    │  │
│  │  - PDF Processing & Text Extraction (pdfplumber)    │  │
│  │  - Text Chunking with overlap                        │  │
│  │  - Embedding Generation (sentence-transformers)     │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│         ┌────────────────┼────────────────┐                │
│         ▼                ▼                ▼                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │  ChromaDB    │ │   Groq API   │ │   File Ops   │      │
│  │  (Vector DB) │ │ (LLM Answers)│ │ (Storage)    │      │
│  └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 RAG Workflow

1. **Upload PDF** → File received and stored
2. **Extract Text** → Content extracted using pdfplumber
3. **Chunk Content** → Split into ~500 word chunks with 50-word overlap
4. **Generate Embeddings** → Convert chunks to vectors (384-dim)
5. **Store in ChromaDB** → Vector embeddings indexed in local DB
6. **Query** → User asks a question
7. **Encode Query** → Convert query to embedding
8. **Similarity Search** → Find top 4 similar chunks in ChromaDB
9. **Retrieve Context** → Get relevant document sections
10. **Generate Answer** → Use Groq LLM with context to answer
11. **Display Results** → Show query, chunks, and answer in UI

## 📦 Prerequisites

- **Python 3.8+**
- **Node.js 14+** & npm
- **Groq API Key** (Get free key at [console.groq.com](https://console.groq.com))

## 🛠️ Installation

### Backend Setup (Python)

```bash
# Navigate to project root
cd BasicRAG_Tanveer

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your Groq API key
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

### Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Return to project root
cd ..
```

## 🚀 Running the Application

### 1. Start Backend Server (Flask)

```bash
# Make sure virtual environment is activated
python app.py
```

Server will start on `http://localhost:5000`

Expected output:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

### 2. Start Frontend Server (React)

In a new terminal:

```bash
# Navigate to frontend
cd frontend

# Start React development server
npm start
```

The app will automatically open at `http://localhost:3000`

## 📝 Usage Guide

### 1. Upload a PDF

- Click the **"📤 Upload PDF"** tab
- Drag and drop a PDF or click to select
- The file will be processed:
  - Text extracted
  - Content split into chunks
  - Embeddings generated
  - Stored in ChromaDB

### 2. Query the Document

- Click the **"🔍 Query"** tab
- Enter your question in the text area
- Click **"🚀 Search & Generate Answer"**
- The system will:
  - Convert query to embedding
  - Search ChromaDB for relevant chunks
  - Retrieve top 4 matches
  - Generate answer using Groq LLM

### 3. View Results

- **Retrieved Chunks**: Click to expand and see the document sections
- **Relevance Score**: Metric showing how relevant each chunk is
- **LLM Answer**: Final answer generated based on retrieved context

### 4. Manage Documents

- Click **"📚 Documents"** tab to see all uploaded files
- Use **"🗑️ Clear All Documents"** to reset the database

## 🔧 Configuration

### Environment Variables (.env)

```bash
GROQ_API_KEY=your_actual_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

### Backend Settings (app.py)

- **Chunk Size**: 500 words (adjustable in `extract_pdf_chunks()`)
- **Chunk Overlap**: 50 words
- **Top Results**: 4 chunks retrieved per query
- **Embedding Model**: All-MiniLM-L6-v2 (384 dimensions)
- **LLM Model**: Mixtral-8x7b-32768 (can use llama-3-70b-8192)

### Frontend Configuration (App.jsx)

- **API Base URL**: `http://localhost:5000`
- **Tabs**: Upload, Query, Documents management

## 📊 API Endpoints

### Upload PDF
```
POST /upload
Content-Type: multipart/form-data

Returns: {
  "status": "success",
  "message": "PDF processed successfully",
  "chunks_count": 42,
  "filename": "document.pdf"
}
```

### Query RAG
```
POST /query
Content-Type: application/json
Body: {"query": "Your question here"}

Returns: {
  "query": "Your question here",
  "retrieved_chunks": [
    {"chunk": "text...", "relevance": 0.15},
    ...
  ],
  "answer": "Generated answer...",
  "status": "success"
}
```

### Get Documents
```
GET /documents

Returns: {
  "documents": ["file1.pdf", "file2.pdf"],
  "count": 2
}
```

### Clear Database
```
POST /clear

Returns: {
  "status": "success",
  "message": "Database cleared"
}
```

### Health Check
```
GET /health

Returns: {"status": "healthy"}
```

## 🧠 How It Works

### Text Chunking
- Splits PDF text into overlapping chunks
- Default: 500 words per chunk, 50 word overlap
- Prevents context loss at chunk boundaries

### Embeddings
- Uses `sentence-transformers` with All-MiniLM-L6-v2 model
- Produces 384-dimensional vectors
- Captures semantic meaning of text

### Vector Search
- ChromaDB stores embeddings locally
- Uses cosine similarity for retrieval
- Returns most similar chunks (lower distance = more relevant)

### Answer Generation
- Groq API provides fast LLM inference
- Uses Mixtral 8x7B or Llama 3 70B
- Prompt-engineered for RAG context

## 🐛 Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**ModuleNotFoundError:**
```bash
# Make sure virtual environment is activated
pip install -r requirements.txt
```

**GROQ_API_KEY not found:**
```bash
# Create .env file with your API key
echo GROQ_API_KEY=your_key_here > .env
```

### Frontend Issues

**Cannot connect to backend:**
- Ensure Flask server is running on `http://localhost:5000`
- Check CORS is enabled in `app.py`
- Clear browser cache

**Port 3000 already in use:**
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Dependencies

### Python (Backend)
- `flask`: Web framework
- `flask-cors`: CORS support
- `pdfplumber`: PDF text extraction
- `chromadb`: Vector database
- `groq`: LLM API client
- `sentence-transformers`: Embedding generation
- `python-dotenv`: Environment variables

### JavaScript (Frontend)
- `react`: UI framework
- `axios`: HTTP client
- `react-scripts`: Build tools

## 🔐 Security Notes

- **API Key**: Store Groq API key in `.env` file (never commit to git)
- **CORS**: Currently accepts all origins (adjust for production)
- **File Upload**: Only accepts PDF files, consider adding size limits
- **Data Storage**: ChromaDB stores data locally in memory by default

## 📈 Performance Considerations

- **First Upload**: May take 10-30 seconds depending on PDF size
- **Query Time**: Usually 2-5 seconds (including LLM inference)
- **Embedding Generation**: ~100-200ms for query encoding
- **Vector Search**: <50ms for similarity search in ChromaDB

## 🔮 Future Enhancements

- [ ] Support for multiple document types (DOCX, TXT, etc.)
- [ ] Advanced chunking strategies (semantic, sliding window)
- [ ] Multiple embedding model options
- [ ] Document similarity visualization
- [ ] Query history and bookmarking
- [ ] Answer feedback and refinement
- [ ] Batch processing for large PDFs
- [ ] Vector DB persistence to disk

## 📄 License

MIT License - Feel free to use this project for learning and experimentation.

## 🤝 Contributing

Contributions welcome! Please fork and submit pull requests.

## ❓ Questions?

Check the troubleshooting section or review the code comments for more details.

---

Built with ❤️ for demonstrating RAG architecture and LLM capabilities.
