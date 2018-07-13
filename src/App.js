import React from 'react';

/* API */
import * as BooksAPI from './BooksAPI';

/* Styles */
import './App.css';

/* Routes */
import Main from './routes/main';
import Search from './routes/search';

/* Components */
import { Switch, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: [],
      searchBooks: [],
      allBookIds: [],
      allBooks: []
    };
  }

  componentDidMount() {
    this.reload();
  }

  async reload() {
    const books = await BooksAPI.getAll();
    const currentlyReadingBooks = books.filter(
      book => book.shelf === 'currentlyReading'
    );
    const wantToReadBooks = books.filter(book => book.shelf === 'wantToRead');
    const readBooks = books.filter(book => book.shelf === 'read');
    const allBooks = [
      ...currentlyReadingBooks,
      ...wantToReadBooks,
      ...readBooks
    ];
    const allBookIds = allBooks.map(book => book.id);
    this.setState({
      currentlyReadingBooks,
      wantToReadBooks,
      readBooks,
      allBooks,
      allBookIds
    });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Main
                {...props}
                data={{
                  currentlyReadingBooks: this.state.currentlyReadingBooks,
                  wantToReadBooks: this.state.wantToReadBooks,
                  readBooks: this.state.readBooks,
                  reload: this.reload.bind(this)
                }}
              />
            )}
          />
          <Route
            path="/search"
            render={props => (
              <Search
                {...props}
                data={{
                  allBooks: this.state.allBooks,
                  allBookIds: this.state.allBookIds,
                  reload: this.reload.bind(this)
                }}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
