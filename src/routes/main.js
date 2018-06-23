import React from 'react';

/* Components */
import Book from '../components/book';

export default class Main extends React.Component {
  componentWillReceiveProps(props) {
    console.log(props);
  }
  render() {
    return (
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
                  {this.props.data.currentlyReadingBooks &&
                    this.props.data.currentlyReadingBooks.length > 0 &&
                    this.props.data.currentlyReadingBooks.map(book => (
                      <li key={book.id}>
                        <Book reload={this.props.data.reload} book={book} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.data.wantToReadBooks &&
                    this.props.data.wantToReadBooks.length > 0 &&
                    this.props.data.wantToReadBooks.map(book => (
                      <li key={book.id}>
                        <Book reload={this.props.data.reload} book={book} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.data.readBooks &&
                    this.props.data.readBooks.length > 0 &&
                    this.props.data.readBooks.map(book => (
                      <li key={book.id}>
                        <Book reload={this.props.data.reload} book={book} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    );
  }
}
