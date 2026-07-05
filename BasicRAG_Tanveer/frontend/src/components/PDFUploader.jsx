import React, { useState, useRef } from 'react';
import './PDFUploader.css';

function PDFUploader({ onUpload, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onUpload(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="uploader-container">
      <h2>📤 Upload PDF Document</h2>
      <p>Upload a PDF file to start the RAG process</p>

      <div
        className={`drop-zone ${dragActive ? 'active' : ''} ${loading ? 'disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!loading ? handleClick : undefined}
      >
        <div className="drop-zone-content">
          <div className="drop-icon">📁</div>
          <h3>Drag and drop your PDF here</h3>
          <p>or click to select a file</p>
          <p className="file-hint">Supported format: PDF</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".pdf"
          style={{ display: 'none' }}
          disabled={loading}
        />
      </div>

      <div className="process-steps">
        <h3>RAG Process Flow:</h3>
        <ol>
          <li><strong>PDF Ingestion:</strong> Upload your document</li>
          <li><strong>Chunking:</strong> Split content into manageable pieces</li>
          <li><strong>Embedding Generation:</strong> Convert chunks to vector embeddings</li>
          <li><strong>ChromaDB Storage:</strong> Store embeddings in vector database</li>
          <li><strong>Ready for Queries:</strong> Ask questions about the document</li>
        </ol>
      </div>

      <div className="info-box">
        <h3>ℹ️ How it works:</h3>
        <ul>
          <li>Your PDF will be split into chunks of ~500 words with 50-word overlap</li>
          <li>Each chunk gets converted to embeddings using Nomic Embed</li>
          <li>Embeddings are stored in a local ChromaDB instance</li>
          <li>When you query, the system finds similar chunks and uses Groq to generate answers</li>
        </ul>
      </div>
    </div>
  );
}

export default PDFUploader;
