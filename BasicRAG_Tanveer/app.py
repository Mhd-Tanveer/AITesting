import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import pdfplumber
import chromadb
import numpy as np
import uuid
import re

try:
    from groq import Groq
except Exception:
    Groq = None

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize ChromaDB
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="rag_documents")

# Lightweight local embedding fallback for demo purposes
class SimpleEmbeddingModel:
    def __init__(self, dim=256):
        self.dim = dim

    def encode(self, text):
        tokens = re.findall(r"\b\w+\b", text.lower())
        vector = np.zeros(self.dim, dtype=np.float32)
        if not tokens:
            return vector

        for token in tokens:
            idx = abs(hash(token)) % self.dim
            vector[idx] += 1.0

        norm = np.linalg.norm(vector)
        if norm > 0:
            vector = vector / norm
        return vector

embedding_model = SimpleEmbeddingModel()

# Initialize Groq
api_key = os.getenv("GROQ_API_KEY")
if Groq is not None and api_key and api_key != "gsk_sample_key_replace_with_your_actual_key":
    try:
        groq_client = Groq(api_key=api_key)
    except Exception:
        groq_client = None
else:
    groq_client = None

# Store document chunks
document_chunks = {}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"})

@app.route('/upload', methods=['POST'])
def upload_pdf():
    """Upload and process PDF file"""
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        if not file.filename.endswith('.pdf'):
            return jsonify({"error": "Only PDF files are supported"}), 400
        
        # Read PDF and extract text
        pdf_path = os.path.join('data/data', file.filename)
        os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
        file.save(pdf_path)
        
        # Extract text from PDF
        chunks = extract_pdf_chunks(pdf_path)
        
        # Generate embeddings and store in ChromaDB
        process_chunks(file.filename, chunks)
        
        return jsonify({
            "status": "success",
            "message": f"PDF processed successfully",
            "chunks_count": len(chunks),
            "filename": file.filename
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/query', methods=['POST'])
def query_rag():
    """Query the RAG system"""
    try:
        data = request.json
        query_text = data.get('query')
        
        if not query_text:
            return jsonify({"error": "No query provided"}), 400
        
        # Generate embedding for query
        query_embedding = embedding_model.encode(query_text).tolist()
        
        # Retrieve top 4 relevant chunks from ChromaDB
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=4
        )
        
        # Format retrieved chunks
        retrieved_chunks = []
        if results and results['documents']:
            for i, doc in enumerate(results['documents'][0]):
                retrieved_chunks.append({
                    "chunk": doc,
                    "relevance": results['distances'][0][i] if 'distances' in results else 0
                })
        
        # Generate answer using Groq
        context = "\n\n".join([chunk['chunk'] for chunk in retrieved_chunks])
        
        answer = generate_answer_with_groq(query_text, context)
        
        return jsonify({
            "query": query_text,
            "retrieved_chunks": retrieved_chunks,
            "answer": answer,
            "status": "success"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/documents', methods=['GET'])
def get_documents():
    """Get list of uploaded documents"""
    try:
        return jsonify({
            "documents": list(document_chunks.keys()),
            "count": len(document_chunks)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/clear', methods=['POST'])
def clear_database():
    """Clear all stored documents and embeddings"""
    try:
        global collection, document_chunks
        
        # Delete and recreate collection
        chroma_client.delete_collection(name="rag_documents")
        collection = chroma_client.get_or_create_collection(name="rag_documents")
        document_chunks = {}
        
        return jsonify({
            "status": "success",
            "message": "Database cleared"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def extract_pdf_chunks(pdf_path, chunk_size=500, overlap=50):
    """Extract text from PDF and split into chunks"""
    chunks = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            full_text = ""
            for page in pdf.pages:
                full_text += page.extract_text() or ""
        
        # Split into chunks
        words = full_text.split()
        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i + chunk_size])
            if chunk.strip():
                chunks.append(chunk)
    
    except Exception as e:
        print(f"Error extracting PDF: {e}")
    
    return chunks

def process_chunks(filename, chunks):
    """Generate embeddings and store chunks in ChromaDB"""
    try:
        ids = []
        embeddings = []
        metadatas = []
        
        for i, chunk in enumerate(chunks):
            chunk_id = f"{filename}_{i}_{str(uuid.uuid4())[:8]}"
            embedding = embedding_model.encode(chunk).tolist()
            
            ids.append(chunk_id)
            embeddings.append(embedding)
            metadatas.append({"filename": filename, "chunk_index": i})
        
        # Store in ChromaDB
        collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=chunks,
            metadatas=metadatas
        )
        
        document_chunks[filename] = {
            "chunk_count": len(chunks),
            "chunk_ids": ids
        }
        
        print(f"Stored {len(chunks)} chunks for {filename}")
    
    except Exception as e:
        print(f"Error processing chunks: {e}")

def generate_answer_with_groq(query, context):
    """Generate answer using Groq API or a local fallback"""
    try:
        if groq_client is None:
            return generate_local_answer(query, context)

        message = groq_client.chat.completions.create(
            model="mixtral-8x7b-32768",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that answers questions based on provided context. Keep your answer concise and relevant to the query."
                },
                {
                    "role": "user",
                    "content": f"Context:\n{context}\n\nQuestion: {query}\n\nAnswer:"
                }
            ],
            max_tokens=1024,
            temperature=0.7
        )
        
        return message.choices[0].message.content
    
    except Exception as e:
        return generate_local_answer(query, context)


def generate_local_answer(query, context):
    """Create a simple heuristic answer when Groq is unavailable"""
    snippets = [s.strip() for s in context.split("\n\n") if s.strip()]
    if not snippets:
        return "No relevant content was found in the document for this question."

    best_snippet = snippets[0]
    if len(best_snippet) > 700:
        best_snippet = best_snippet[:700] + "..."

    return f"Based on the retrieved document context, the most relevant information is: {best_snippet}"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
