import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid'


class SearchBooks extends Component {

    static PropTypes = {
        bookSearchResults: PropTypes.array.isRequired,
        onBookSearch: PropTypes.func.isRequired
    }
    
    state = {
        query: ""
    }

    updateQuery = (text) => {
        this.setState({
            query: text
        })
        this.props.onBookSearch(text);
    }
 

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.onCloseSearch}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                         placeholder="Search by title or author"
                         value={this.state.query}
                         onChange={(e) => this.updateQuery(e.target.value)}
                         />
                    </div>
                </div>
                <div className="search-books-results">
                <BookGrid books={this.props.bookSearchResults}
                    onBookUpdated={this.props.onBookUpdated}
                />
            </div>
          </div>

        )
    }
}

export default SearchBooks