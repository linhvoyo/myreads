import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  state = {
    query: '',
  }

  searchHandler = (event) => {
    this.setState({ query: event.target.value },
      () => this.props.onSearch(event, this.state.query));
  }

  render() {
    return <input
        className='search-books'
        type='text'
        value={this.state.query}
        placeholder='Search Books'
        onChange={this.searchHandler} />
  }
}