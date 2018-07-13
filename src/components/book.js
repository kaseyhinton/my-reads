import React from 'react';
import * as BooksApi from '../BooksAPI';

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  async handleSelect(event) {
    const shelf = event.target.value;
    await BooksApi.update(this.props.book, shelf);
    console.log(this.props);
    this.props.reload();
  }

  render() {
    if (this.props.book)
      return (
        <div className="book" title={this.props.book.contentVersion}>
          <div className="book-top">
            {this.props.book.imageLinks &&
              this.props.book.imageLinks.smallThumbnail && (
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      this.props.book.imageLinks.smallThumbnail
                    })`
                  }}
                />
              )}
            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf || 'none'}
                onChange={this.handleSelect}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors &&
              this.props.book.authors.length > 0 &&
              this.props.book.authors.map(author => `${author}, `)}
          </div>
        </div>
      );
  }
}
