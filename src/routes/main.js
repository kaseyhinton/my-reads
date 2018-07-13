import React from 'react';

/* Components */
import BookShelf from '../components/bookShelf';

export default class Main extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {this.props.data.books &&
          this.props.data.books.length > 0 && (
            <div className="list-books-content">
              <BookShelf
                title="Read"
                shelf="currentlyReading"
                books={this.props.data.books}
                reload={this.props.data.reload}
              />
              <BookShelf
                title="Read"
                shelf="wantToRead"
                books={this.props.data.books}
                reload={this.props.data.reload}
              />
              <BookShelf
                title="Read"
                shelf="read"
                books={this.props.data.books}
                reload={this.props.data.reload}
              />
            </div>
          )}

        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    );
  }
}
