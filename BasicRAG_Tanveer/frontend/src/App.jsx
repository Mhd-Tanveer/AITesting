import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PDFUploader from './components/PDFUploader';
import QueryInterface from './components/QueryInterface';
import RetrievalResults from './components/RetrievalResults';
import DocumentList from './components/DocumentList';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [documents, setDocuments] = useState([]);
  const [queryResults, setQueryResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  // Fetch documents list
  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/documents`);
      setDocuments(response.data.documents);
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle PDF upload
  const handleUpload = async (file) => {
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setError('');
      await fetchDocuments();
      setActiveTab('query');
      alert('PDF uploaded and processed successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Error uploading PDF');
    } finally {
      setLoading(false);
    }
  };

  // Handle query submission
  const handleQuery = async (query) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/query`, {
        query: query
      });
      
      setQueryResults(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error processing query');
      setQueryResults(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle clear database
  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear all documents? This cannot be undone.')) {
      setLoading(true);
      try {
        await axios.post(`${API_BASE_URL}/clear`);
        setDocuments([]);
        setQueryResults(null);
        setError('');
        alert('Database cleared successfully');
      } catch (err) {
        setError(err.response?.data?.error || 'Error clearing database');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 RAG Explorer</h1>
        <p>Retrieval-Augmented Generation with ChromaDB & Groq</p>
      </header>

      <div className="container">
        <nav className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            📤 Upload PDF
          </button>
          <button
            className={`tab-btn ${activeTab === 'query' ? 'active' : ''}`}
            onClick={() => setActiveTab('query')}
          >
            🔍 Query
          </button>
          <button
            className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            📚 Documents ({documents.length})
          </button>
        </nav>

        {error && <div className="error-message">{error}</div>}

        <div className="content">
          {activeTab === 'upload' && (
            <div className="tab-content">
              <PDFUploader onUpload={handleUpload} loading={loading} />
            </div>
          )}

          {activeTab === 'query' && (
            <div className="tab-content">
              <QueryInterface onQuery={handleQuery} loading={loading} />
              {queryResults && <RetrievalResults results={queryResults} />}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="tab-content">
              <DocumentList documents={documents} />
              {documents.length > 0 && (
                <button className="clear-btn" onClick={handleClear} disabled={loading}>
                  🗑️ Clear All Documents
                </button>
              )}
            </div>
          )}
        </div>

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Processing...</p>
          </div>
        )}
      </div>

      <footer className="App-footer">
        <p>RAG Flow: PDF Ingestion → Chunking → Embeddings → ChromaDB Storage → Retrieval → Groq LLM Answer</p>
      </footer>
    </div>
  );
}

export default App;
