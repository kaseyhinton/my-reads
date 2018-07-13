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
      books: []
    };
  }

  componentDidMount() {
    this.reload();
  }

  async reload() {
    this.setState({ books: await BooksAPI.getAll() });
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
                  books: this.state.books,
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
                  books: this.state.books,
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
