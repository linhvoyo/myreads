import React from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../BooksAPI';
import './Shelves.css';
import DisplayBooks from '../components/DisplayBooks';
import { SHELVES } from '../constants';

export default class Layout extends React.Component {
  state = {
    books: [],
    error: ''
  }

  componentDidMount() {
    getAll().then(r => this.setState({ books: r }))
  };

  shelfChangeHandler = () => {
    return getAll().then(r => this.setState({ books: r }))
  };

  render() {
    return <div>
      <h1>My Reads</h1>
      {
        Object.keys(SHELVES).map(shelf => <div className='bookshelf'>
          <span className='bookshelf-title'>{SHELVES[shelf]}</span>
          <DisplayBooks
            books={this.state.books}
            key={shelf}
            onShelfChange={this.shelfChangeHandler}
            shelfFilter={shelf}
          ></DisplayBooks>
        </div>)
      }
      <div className='open-search'>
        <Link to='/search'>Search</Link>
      </div>
    </div>
  }
}