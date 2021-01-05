import React from 'react';
import {withRouter} from 'react-router-dom';

import { SHELVES } from '../constants';
import { update } from '../BooksAPI';

function book(props) {
  const { book, onShelfChange } = props;
  const options = { ...SHELVES, none: 'None' }

  const shelfChangeHandler = async (event, book) => {
    const shelf = Object.keys(SHELVES).find(opt => SHELVES[opt] === event.target.value);
    await update(book, shelf).then(r => { console.log(r)})
    if (props.history.location.pathname === '/') onShelfChange();
  };

  return !book ? null
    : <div className='book'>
      <img src={book.imageLinks.smallThumbnail} alt={book.title} />
      <p className='book-title'>{book.title}</p>
      {book.authors && book.authors.map((author => <p className='book-authors' key={author}>{author}</p>))}
      {/* <button onClick={}>Change Self</button> */}
      <select
        defaultValue={book.shelf ? options[book.shelf] : 'None'}
        onChange={(event) => shelfChangeHandler(event, book)} >
        <option disabled>Move To...</option>
        {Object.keys(options).map(opt => <option key={opt}>{options[opt]}</option>)}
      </select>
    </div>
};

export default withRouter(book);