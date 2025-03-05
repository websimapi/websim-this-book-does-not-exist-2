import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import BookGenerator from './components/BookGenerator.js';
import BookGallery from './components/BookGallery.js';
import BookModal from './components/BookModal.js';
import { initializeRoom } from './services/websocketService.js';

const App = () => {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function setupRoom() {
      const roomInstance = await initializeRoom();
      setRoom(roomInstance);
      setIsLoading(false);
    }
    setupRoom();
  }, []);

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="app-container">
        <header>
          <h1>This Book Does Not Exist</h1>
          <p>Generating imaginary books in real-time...</p>
        </header>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>This Book Does Not Exist</h1>
        <p>Create fictional books with AI-generated content and covers</p>
      </header>

      <BookGenerator room={room} />
      
      <BookGallery 
        room={room} 
        onViewBook={handleViewBook}
      />
      
      {isModalOpen && selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

