import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/bookService.js';

const BookGallery = ({ room, onViewBook }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to books collection
    const unsubscribe = room.collection('book').subscribe((booksList) => {
      setBooks(booksList);
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [room]);

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }

  if (books.length === 0) {
    return (
      <div className="empty-gallery">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <h3>No Books Generated Yet</h3>
        <p>Be the first to create an imaginary book!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Book Gallery</h2>
      <div className="book-gallery">
        {books.map((book) => (
          <div className="book-item" key={book.id}>
            <img 
              src={book.coverImageUrl} 
              alt={`Cover for ${book.title}`} 
              className="book-cover"
            />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-description">{book.description.substring(0, 120)}...</p>
              <p className="book-created-by">Created by: {book.username}</p>
              <button 
                className="view-details-btn"
                onClick={() => onViewBook(book)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGallery;

