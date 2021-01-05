import React from 'react';
import Book from './Book';
import './DisplayBooks.css';

const displayBooks = (props) => {
  const { books, onShelfChange, shelfFilter } = props;
  const showBooks = shelfFilter ? books.filter(b => b.shelf === shelfFilter) : books;
  return showBooks && <div className='books-grid'>
      {showBooks.map(book => <Book book={book} key={book.id} onShelfChange={onShelfChange}></Book>)}
    </div>
};

export default displayBooks;
