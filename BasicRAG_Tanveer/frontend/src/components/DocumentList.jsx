import React from 'react';
import './DocumentList.css';

function DocumentList({ documents }) {
  return (
    <div className="document-list-container">
      <h2>📚 Uploaded Documents</h2>
      {documents.length === 0 ? (
        <div className="empty-state">
          <p>No documents uploaded yet.</p>
          <p>Upload a PDF to get started!</p>
        </div>
      ) : (
        <div className="document-grid">
          {documents.map((doc, index) => (
            <div key={index} className="document-card">
              <div className="document-icon">📄</div>
              <div className="document-info">
                <h3>{doc}</h3>
                <p>✅ Processed and indexed</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentList;
