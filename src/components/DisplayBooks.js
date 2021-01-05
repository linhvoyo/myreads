import React from 'react';
import Book from './Book';

const displayBooks = (props) => {
  const { books, onShelfChange, shelfTitle, shelfFilter } = props;
  const showBooks = shelfFilter ? books.filter(b => b.shelf === shelfFilter) : books;
  return showBooks && <div>
    {shelfTitle && <p className='bookshelf-title'>{shelfTitle}</p>}
    <div className='books-grid'>
      {showBooks.map(book => <Book book={book} key={book.id} onShelfChange={onShelfChange}></Book>)}
    </div>
  </div>
};

export default displayBooks;
