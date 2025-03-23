export const getSavedBookIds = (): string[] => {
  const savedBookIds = localStorage.getItem('saved_books');
  return savedBookIds ? JSON.parse(savedBookIds) : [];
};

export const saveBookIds = (bookIdArr: string[]) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const saveBookId = (bookId: string) => {
  const savedBookIds = getSavedBookIds();
  // Prevent duplicate entries
  if (!savedBookIds.includes(bookId)) {
    localStorage.setItem('saved_books', JSON.stringify([...savedBookIds, bookId]));
  }
};

export const removeBookId = (bookId: string) => {
  const savedBookIds = getSavedBookIds();
  const updatedSavedBookIds = savedBookIds.filter((id) => id !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
  return true; // Return true to indicate the removal was successful
};