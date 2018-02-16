import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

    this.state = {
      term: ''
    }
  }
  
  // grabs the search term when a user clicks the search button
  search() {
    this.props.onSearch(this.state.term);
  }

  // updates the term state when a user updates the search input field
  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  render() {
      return (
          <div className="SearchBar">
              <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
              <a onClick={this.search}>SEARCH</a>
          </div>
      );
  }
}

export default SearchBar;