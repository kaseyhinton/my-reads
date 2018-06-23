import React from 'react';

/* API */
import * as BooksAPI from '../BooksAPI';

/* Components */
import Book from '../components/book';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchBooks: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    console.log(props);
  }

  async handleChange(event) {
    let searchTerm = event.target.value;
    this.setState({ searchTerm });
    if (searchTerm === '') {
      this.setState({ searchBooks: [] });
      return;
    }
    try {
      const searchBooks = await BooksAPI.search(searchTerm);
      // loop through results and identify if we already have any of those books on
      // our shelves and place them in the proper shelf
      searchBooks.forEach(book => {
        if (this.props.data.allBookIds.includes(book.id)) {
          let bookOnShelf = this.props.data.allBooks.filter(
            b => b.id === book.id
          )[0];
          book.shelf = bookOnShelf.shelf;
        }
      });
      this.setState({ searchBooks });
    } catch (error) {
      this.setState({ searchBooks: [] });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href="/">
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks &&
              this.state.searchBooks.length > 0 &&
              this.state.searchBooks.map(book => (
                <li key={book.id}>
                  <Book reload={this.props.data.reload} book={book} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
