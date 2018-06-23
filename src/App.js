import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

/* Components */
import Book from './components/book';

class BooksApp extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: [],
      searchBooks: [],
      allBookIds: [],
      allBooks: [],
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  async reload() {
    const books = await BooksAPI.getAll();
    const currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading');
    const wantToReadBooks = books.filter(book => book.shelf === 'wantToRead');
    const readBooks = books.filter(book => book.shelf === 'read');
    const allBooks = [...currentlyReadingBooks, ...wantToReadBooks, ...readBooks];
    const allBookIds = allBooks.map(book => book.id);
    this.setState({currentlyReadingBooks,wantToReadBooks,readBooks, allBooks, allBookIds});
  }

  async handleChange(event) {
    let searchTerm = event.target.value;
    this.setState({searchTerm});
    if (searchTerm === ''){
      this.setState({
        searchBooks : []
      })
      return;
    }
    try {
      const searchBooks = await BooksAPI.search(searchTerm);
      // loop through results and identify if we already have any of those books on our shelves and place them in the proper shelf
      searchBooks.forEach(book => {
        if(this.state.allBookIds.includes(book.id)) {
          let bookOnShelf = this.state.allBooks.filter(b => b.id === book.id)[0];
          book.shelf = bookOnShelf.shelf;
        }
      });
      this.setState({ searchBooks });
    } catch(error) {
      this.setState({ searchBooks: [] });
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false, searchBooks: [] })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
               <ol className="books-grid">
                  {
                    this.state.searchBooks && this.state.searchBooks.length > 0 && this.state.searchBooks.map(book => (
                      <li key={book.id}>
                        <Book reload={this.reload.bind(this)} book={book} />
                      </li>
                    ))
                  }
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                          this.state.currentlyReadingBooks  && this.state.currentlyReadingBooks.length > 0 && this.state.currentlyReadingBooks.map(book => (
                            <li key={book.id}>
                             <Book reload={this.reload.bind(this)} book={book} />
                            </li>
                          ))
                        }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.wantToReadBooks   && this.state.wantToReadBooks.length > 0 && this.state.wantToReadBooks.map(book => (
                          <li key={book.id}>
                            <Book reload={this.reload.bind(this)} book={book} />
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.state.readBooks  && this.state.readBooks.length > 0 && this.state.readBooks.map(book => (
                          <li key={book.id}>
                            <Book reload={this.reload.bind(this)} book={book} />
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
