import React from 'react';

/* Components */
import Book from '../components/book';

export default class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter(book => book.shelf === this.props.shelf)
              .map(book => (
                <li key={book.id}>
                  <Book reload={this.props.reload} book={book} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
