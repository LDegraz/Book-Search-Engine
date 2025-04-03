export const getSavedBookIds = (): string[] => {
  const stored = localStorage.getItem('saved_books');
  return stored ? JSON.parse(stored) : [];
};

export const saveBookIds = (bookIdArr: string[]) => {
  if (bookIdArr.length > 0) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId: string): boolean => {
  const stored = localStorage.getItem('saved_books');
  if (!stored) return false;

  const parsedIds: string[] = JSON.parse(stored);
  const updatedIds = parsedIds.filter((id) => id !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedIds));

  return true;
};
