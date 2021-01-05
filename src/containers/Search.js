import React from 'react';
import { search } from '../BooksAPI';

import SearchBar from '../components/SearchBar';
import DisplayBooks from '../components/DisplayBooks';


export default class Search extends React.Component {
  state = {
    books: [],
    query: '',
    loading: false,
    error: '',
  }

  searchHandler = (event) => {
    this.setState({ query: event.target.value, loading: true })
  }

  searchSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    if (this.state.query) {
      search(this.state.query, 20)
        .then(r => {
          if (r.error) this.setState({ books: [], error: r.error, loading: false })
          else this.setState({ books: r, error: '', loading: false })
        });
    };
  };

  render() {
    console.log(this.state)
    return <div>
      <form onSubmit={this.searchSubmitHandler}>
        <input
          className='search-books'
          type='text'
          value={this.state.query}
          placeholder='Search Books'
          onChange={this.searchHandler}></input>
      </form>
      {this.state.error && <span>No books found</span>}
      <DisplayBooks books={this.state.books}></DisplayBooks>
    </div>
  }
}