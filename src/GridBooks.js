import React, { Component } from 'react';
import BookGrid from './BookGrid'

class GridBooks extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf}</h2>
                <div className="bookshelf-books">
                <BookGrid books={this.props.books}
                    onBookUpdated={this.props.onBookUpdated}
                 />
                </div>
            </div>
        )
    }
}

export default GridBooks