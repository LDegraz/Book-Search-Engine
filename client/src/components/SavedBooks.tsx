import React, { useEffect, useState } from 'react';
import { getSavedBookIds, removeBookId } from '../utils/localStorage';
import { Alert, Button } from 'react-bootstrap';

const SavedBooks: React.FC = () => {
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const savedIds = getSavedBookIds();
    setSavedBooks(savedIds);
  }, []);

  const handleRemoveBook = (bookId: string) => {
    // Remove book ID from local storage
    removeBookId(bookId);
    setSavedBooks((prev) => prev.filter((id) => id !== bookId));
    setShowAlert(true); // Show alert after removing a book
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
        savedBooks.map((bookId) => (
          <div key={bookId} className='mb-3'>
            <h3>{bookId}</h3>
            <Button variant='danger' onClick={() => handleRemoveBook(bookId)}>
              Remove
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedBooks;