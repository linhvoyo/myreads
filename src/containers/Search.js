import React from 'react';
import { search } from '../BooksAPI';

import SearchBar from './SearchBar';
import DisplayBooks from '../components/DisplayBooks';


export default class Search extends React.Component {
  state = {
    books: [],
    loading: false,
    error: '',
  }

  searchSubmitHandler = (event, query) => {
    event.preventDefault();
    this.setState({ loading: true })
    if (query) {
      search(query, 20)
        .then(r => {
          if (r.error) this.setState({ books: [], error: r.error, loading: false })
          else this.setState({ books: r, error: '', loading: false })
        });
    };
  };

  render() {
    return <div>
      <SearchBar onSearch={this.searchSubmitHandler}></SearchBar>
      {this.state.error && <span>No books found</span>}
      <DisplayBooks books={this.state.books}></DisplayBooks>
    </div>
  }
}