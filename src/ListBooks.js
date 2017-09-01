import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GridBooks from './GridBooks';


class ListBooks extends Component {

	static PropTypes = {
		currentlyReading: PropTypes.array.isRequired,
		wantToRead: PropTypes.array.isRequired,
		read: PropTypes.array.isRequired

	}
 
    render() {
	
	
		return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
				<GridBooks shelf={'Currently Reading'} books={this.props.currentlyReading} onBookUpdated={this.props.onBookUpdated} />
				<GridBooks shelf={'Want to Read'} books={this.props.wantToRead} onBookUpdated={this.props.onBookUpdated} />
				<GridBooks shelf={'Read'} books={this.props.read} onBookUpdated={this.props.onBookUpdated} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        </div>
        )
    }
}

export default ListBooks