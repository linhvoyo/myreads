import React from 'react';
import { Link } from 'react-router-dom';
import { getAll, search } from '../BooksAPI';

import './Search.css'
import SearchBar from './SearchBar';
import DisplayBooks from '../components/DisplayBooks';
import Spinner from '../components/UI/Spinner';


export default class Search extends React.Component {
  state = {
    books: [],
    myReads: [],
    loading: false,
    error: '',
  }

  componentDidMount() {
    getAll().then(r => this.setState({ myReads: r }))
  }

  matchSearchBooksToShelf = () => {
    const myReadsHash = {};
    this.state.myReads.forEach((book) => myReadsHash[book.id] = book)
    return this.state.books
      .map((book) => book.id in myReadsHash ? { ...book, shelf: myReadsHash[book.id].shelf }
        : book)
  }

  searchSubmitHandler = (event, query) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (query) {
      search(query, 20)
        .then(r => {
          if (r.error) this.setState({ books: [], error: r.error, loading: false })
          else this.setState({ books: r, error: '', loading: false })
        });
    } else {
      this.setState({ books: [], error: '', loading: false });
    }
  };


  render() {
    const showBooks = this.state.books.length && this.state.myReads.length ? this.matchSearchBooksToShelf()
      : this.state.books;
    return <div className="Search">
      <SearchBar onSearch={this.searchSubmitHandler}></SearchBar>
      <div className='search-bar'><Link to='/'>Back to Shelves</Link></div>
      {this.state.error && <p>No books found</p>}
      {!this.state.loading ? <DisplayBooks books={showBooks}></DisplayBooks> : <Spinner></Spinner>}
    </div>
  }
}