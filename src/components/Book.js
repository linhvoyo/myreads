import React from 'react';
import { withRouter } from 'react-router-dom';

import './Book.css';
import { SHELVES } from '../constants';
import { update } from '../BooksAPI';


function book(props) {
  const { book, onShelfChange } = props;
  const options = { ...SHELVES, none: 'None' }

  const shelfChangeHandler = async (event, book) => {
    const shelf = Object.keys(options).find(opt => options[opt] === event.target.value);
    await update(book, shelf).then(r => { console.debug(r) })
    if (props.history.location.pathname === '/') onShelfChange();
  };

  if (!book) return null;

  const modifyShelfSelect = <div className='book-shelf-changer'>
    <select
      defaultValue={book.shelf ? options[book.shelf] : 'None'}
      onChange={(event) => shelfChangeHandler(event, book)} >
      <option disabled>Move To...</option>
      {Object.keys(options).map(opt => <option key={opt}>{options[opt]}</option>)}
    </select>
  </div>

  return <div className='book'>
    {book.imageLinks ? <img src={book.imageLinks.smallThumbnail} alt={book.title} />
      : <div className='empty-img'>N/A</div>}
    {modifyShelfSelect}
    {book.title && <p className='book-title'>{book.title}</p>}
    {book.authors && book.authors.map((author => <p className='book-authors' key={author}>{author}</p>))}
  </div>
};

export default withRouter(book);