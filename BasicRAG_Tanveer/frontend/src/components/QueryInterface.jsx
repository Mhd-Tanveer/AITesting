import React, { useState } from 'react';
import './QueryInterface.css';

function QueryInterface({ onQuery, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery(query);
      setQuery('');
    }
  };

  return (
    <div className="query-container">
      <h2>🔍 Query Your Document</h2>
      <p>Ask questions about your uploaded PDF document</p>

      <form onSubmit={handleSubmit} className="query-form">
        <div className="input-group">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your document... e.g., 'What are the main features?' or 'Summarize the key points'"
            disabled={loading}
            rows="4"
          />
        </div>
        <button type="submit" disabled={loading || !query.trim()} className="submit-btn">
          {loading ? '⏳ Processing...' : '🚀 Search & Generate Answer'}
        </button>
      </form>

      <div className="query-tips">
        <h3>💡 Tips for better results:</h3>
        <ul>
          <li>Ask specific questions related to the document content</li>
          <li>Use clear and concise language</li>
          <li>Include keywords from the document for better retrieval</li>
          <li>The system will retrieve top 4 relevant chunks and generate an answer</li>
        </ul>
      </div>

      <div className="query-workflow">
        <h3>📊 Query Workflow:</h3>
        <div className="workflow-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-text">Query Embedding</div>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-text">Similarity Search</div>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Retrieve Chunks</div>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-text">LLM Answer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueryInterface;
