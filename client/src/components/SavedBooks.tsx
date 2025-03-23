import React, { useEffect, useState } from 'react';
import { getSavedBookIds, removeBookId } from '../utils/localStorage';
import { Alert, Button } from 'react-bootstrap';

interface Book {
  id: string;
  title: string;
}

const SavedBooks: React.FC = () => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const savedIds = getSavedBookIds();
    // Assuming getSavedBookIds returns an array of book IDs
    const savedBooks = savedIds.map(id => ({ id, title: 'Unknown Title' })); // Replace 'Unknown Title' with actual title if available
    setSavedBooks(savedBooks);
  }, []);

  const handleRemoveBook = (bookId: string) => {
    removeBookId(bookId);
    setSavedBooks((prev) => prev.filter((book) => book.id !== bookId));
    setShowAlert(true);
  };

  return (
    <div>
      <h2>Saved Books</h2>
      {showAlert && (
        <Alert variant='success' onClose={() => setShowAlert(false)} dismissible>
          Book removed successfully!
        </Alert>
      )}
      {savedBooks.length === 0 ? (
        <p>No saved books</p>
      ) : (
        savedBooks.map((book) => (
          <div key={book.id} className='mb-3'>
            <h3>{book.title}</h3>
            <Button variant='danger' onClick={() => handleRemoveBook(book.id)}>
              Remove
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedBooks;