import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import { getAll, update, get, search } from './BooksAPI';
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import sortBy from 'sort-by';
const debounce = require('debounce');

class App extends React.Component {

   constructor(props) {
        super(props);
        this.onBookSearch = debounce(this.onBookSearch,300);
    }

  state = {
    bookSearchResults: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    getAll().then((books) => {
      let sortedBooks = books.sort(sortBy('title'));
      let currentlyReading = sortedBooks.filter((book) => book.shelf === 'currentlyReading');
      let wantToRead = sortedBooks.filter((book) => book.shelf === 'wantToRead');
      let read = sortedBooks.filter((book) => book.shelf === 'read');
      this.setState({currentlyReading, wantToRead, read});
    })
  }

  onBookUpdated = (book )=> {
    update(book, book.shelf)
    .then((results) => {
        const { currentlyReading, wantToRead, read } = results;
        const currentlyReadingPromises = Promise.all(currentlyReading.map((id) => get(id)));
        const wantToReadPromises = Promise.all(wantToRead.map((id) => get(id)));
        const readPromises = Promise.all(read.map((id) => get(id)));
        Promise.all([currentlyReadingPromises, wantToReadPromises, readPromises])
        .then((results) => {
          const [currentlyReading, wantToRead, read ] = results;
          this.setState({currentlyReading, wantToRead, read});

        })
    });
  }

  onBookSearch = (text) => { 
    console.log(text);
    search(text, '25')
    .then((results) => {
      if (results instanceof Array) {
        for (let book of results) {
          if (this.isCurrentlyReading(book.id)) {
            book.shelf = "currentlyReading";
          } else if (this.isWantToRead(book.id)) {
            book.shelf = "wantToRead";
          } else if (this.isRead(book.id)) {
            book.shelf = "read";
          } else {
            book.shelf = "none";
          }
        }
        this.setState({ bookSearchResults: results })
      } else {
        this.setState({ bookSearchResults: [] })
      }
    })
  }

  isCurrentlyReading = (bookId) => {
    const currentlyReadingBooks = this.state.currentlyReading || [];
    const index = currentlyReadingBooks.findIndex((book) => book.id === bookId );
    return index !== -1;
  }

  isWantToRead = (bookId) => {
    const wantToReadBooks = this.state.wantToRead || [];
    const index = wantToReadBooks.findIndex((book) => book.id === bookId );
    return index !== -1;
  }

  isRead = (bookId) => {
    const readBooks = this.state.read || [];
    const index = readBooks.findIndex((book) => book.id === bookId );
    return index !== -1;
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => 
          (<ListBooks 
           currentlyReading={this.state.currentlyReading}
           wantToRead={this.state.wantToRead}
           read={this.state.read}
           onBookUpdated={this.onBookUpdated} />)
        }/>

        <Route path="/search"  render={({history}) =>
          (<SearchBooks bookSearchResults={this.state.bookSearchResults} 
          onBookUpdated={this.onBookUpdated} 
            onBookSearch={this.onBookSearch}
          onCloseSearch={() => {
              history.push('/');  
          }}/>)
        } /> 
      </div>
    )
  }
}

export default App
