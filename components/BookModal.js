import React from 'react';

const BookModal = ({ book, onClose }) => {
  return (
    <div className="book-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <img 
          src={book.coverImageUrl} 
          alt={`Cover for ${book.title}`}
          className="modal-book-cover"
        />
        
        <h2 className="modal-book-title">{book.title}</h2>
        <h3 className="modal-book-author">by {book.author}</h3>
        
        <div className="modal-book-details">
          <div className="detail-item">
            <span className="detail-label">Genre</span>
            <span>{book.genre}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Pages</span>
            <span>{book.pages}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Published</span>
            <span>{book.publishYear}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Created By</span>
            <span>{book.username}</span>
          </div>
        </div>
        
        <div className="modal-book-description">
          <h4>Book Description</h4>
          <p>{book.description}</p>
        </div>
        
        <div className="modal-book-summary">
          <h4>Summary</h4>
          <p>{book.summary}</p>
        </div>
        
        {book.keywords && (
          <div className="modal-book-keywords">
            <h4>Keywords</h4>
            <p>{book.keywords}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookModal;

