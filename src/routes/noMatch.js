import React from 'react';

export default class NoMatch extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h2>Oops!</h2>
        <h4>We couldn't locate the page you are looking for</h4>
        <p>Did you mean to visit one of these links instead?</p>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/search">Search</a>
          </li>
        </ul>
      </div>
    );
  }
}
