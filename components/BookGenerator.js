import React, { useState } from 'react';
import { generateBookContent, generateBookCover } from '../services/aiService.js';
import { saveBook } from '../services/bookService.js';

const BookGenerator = ({ room }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title || !genre) {
      setError('Please enter at least a title and genre.');
      return;
    }
    
    try {
      setIsGenerating(true);
      
      // Generate book content (description, summary, etc)
      const prompt = `Create a fictional book called "${title}" by ${author || 'an unknown author'} in the ${genre} genre. ${keywords ? `Include these elements: ${keywords}` : ''}`;
      
      const bookContent = await generateBookContent(prompt);
      
      // Generate book cover based on the content
      const coverPrompt = `Create a book cover for "${title}" by ${author || 'Unknown'}, a ${genre} book. ${bookContent.coverDescription}`;
      const coverImageUrl = await generateBookCover(coverPrompt);
      
      // Save the book to the database
      await saveBook(room, {
        title,
        author: author || 'Unknown Author',
        genre,
        description: bookContent.description,
        summary: bookContent.summary,
        publishYear: bookContent.publishYear,
        pages: bookContent.pages,
        coverImageUrl,
        keywords: keywords || '',
        coverDescription: bookContent.coverDescription
      });
      
      // Reset form
      setTitle('');
      setAuthor('');
      setGenre('');
      setKeywords('');
      
    } catch (err) {
      console.error('Error generating book:', err);
      setError('Failed to generate book. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="book-generator">
      <h2>Generate New Book</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
            disabled={isGenerating}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author Name (optional)</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter an author"
            disabled={isGenerating}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="E.g., Science Fiction, Fantasy, Mystery"
            disabled={isGenerating}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="keywords">Keywords (optional)</label>
          <textarea
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Themes, elements, or specific details you'd like included"
            disabled={isGenerating}
          />
        </div>
        
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating Book...' : 'Generate Book'}
        </button>
      </form>
      
      {isGenerating && (
        <div className="generating-indicator">
          <div className="loading-spinner"></div>
          <p>AI is crafting your book, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default BookGenerator;

