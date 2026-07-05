import React, { useState } from 'react';
import './RetrievalResults.css';

function RetrievalResults({ results }) {
  const [expandedChunk, setExpandedChunk] = useState(null);

  const toggleChunk = (index) => {
    setExpandedChunk(expandedChunk === index ? null : index);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>📋 Results</h2>
      </div>

      <div className="query-section">
        <h3>Your Query:</h3>
        <p className="query-text">{results.query}</p>
      </div>

      <div className="chunks-section">
        <h3>Retrieved Chunks (Top 4)</h3>
        <p className="chunks-info">These are the most relevant chunks from your document:</p>
        
        <div className="chunks-list">
          {results.retrieved_chunks.map((chunk, index) => (
            <div key={index} className="chunk-card">
              <div
                className="chunk-header"
                onClick={() => toggleChunk(index)}
              >
                <div className="chunk-info">
                  <span className="chunk-number">Chunk {index + 1}</span>
                  <span className="relevance-score">
                    Relevance: {(1 - chunk.relevance).toFixed(3)}
                  </span>
                </div>
                <span className="expand-icon">
                  {expandedChunk === index ? '▼' : '▶'}
                </span>
              </div>
              
              {expandedChunk === index && (
                <div className="chunk-content">
                  <p>{chunk.chunk}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="answer-section">
        <h3>🤖 LLM Generated Answer</h3>
        <div className="answer-box">
          <p>{results.answer}</p>
        </div>
      </div>

      <div className="flow-diagram">
        <h3>Complete RAG Flow Executed:</h3>
        <div className="flow-boxes">
          <div className="flow-box">
            <span className="flow-icon">📄</span>
            <span>Query Received</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-box">
            <span className="flow-icon">🧮</span>
            <span>Query Embedded</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-box">
            <span className="flow-icon">🔍</span>
            <span>ChromaDB Search</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-box">
            <span className="flow-icon">✅</span>
            <span>Answer Generated</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetrievalResults;
