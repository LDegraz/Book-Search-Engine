import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const SearchBooks: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Check form validity
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setResults(data.items || []);
      setShowAlert(false); // Reset alert on successful search
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  const handleSaveBook = (bookId: string) => {
    // Logic to save the book ID (e.g., using local storage)
    // Example:
    // saveBookId(bookId);
    console.log(`Book with ID ${bookId} saved!`);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSearch}>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='query'>Search for Books</Form.Label>
          <Form.Control
            type='text'
            value={query}
            onChange={handleInputChange}
            placeholder='Enter book title or author'
            required
          />
          <Form.Control.Feedback type='invalid'>Search query is required!</Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' variant='success'>
          Search
        </Button>
      </Form>

      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your search!
      </Alert>

      <div>
        {results.map((book: any) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
            <Button variant='primary' onClick={() => handleSaveBook(book.id)}>
              Save
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;