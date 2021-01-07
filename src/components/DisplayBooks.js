import React from 'react';
import Book from './Book';
import './DisplayBooks.css';

const displayBooks = (props) => {
  const { books, shelfFilter, onShelfChange } = props;
  const showBooks = shelfFilter ? books.filter(b => b.shelf === shelfFilter) : books;

  if (!showBooks) return null;

  return <div className='books-grid'>
    {showBooks.map(book => <Book book={book} key={book.id} onShelfChange={onShelfChange}></Book>)}
  </div>
};

export default displayBooks;
