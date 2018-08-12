import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Components/Book'

class MainPage extends Component {
    render () {
      return(
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
                      /* 
                      * I'm filtering the books array to get only the books
                      * in the "currentlyReading" shelf and then I'm mapping through
                      * each of them to display.
                      * This is done similarly for the other shelves.  
                      */
                      this.props.books.filter(book => book.shelf === 'currentlyReading')
                      .map(book => (
                        <li key={book.id} >
                          <Book 
                            book={book}
                            changeShelf={this.props.changeShelf}
                            /* 
                            * Creation of currentShelf in order to set a default value.
                            * Doing this in all three selves, "currentlyReading", 
                            * "wantToRead", and "read".
                            * The currentShelf value is accessible via props so I can use it
                            * in Book.js.
                            * For future reference: 
                            * https://reactjs.org/docs/forms.html#why-select-value
                            */
                            currentShelf="currentlyReading"
                          />
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
                      this.props.books.filter(book => book.shelf === 'wantToRead')
                      .map(book => (
                        <li key={book.id} >
                          <Book 
                            book={book}
                            changeShelf={this.props.changeShelf}
                            currentShelf="wantToRead"
                          />
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
                      this.props.books.filter(book => book.shelf === 'read')
                      .map(book => (
                        <li key={book.id} >
                          <Book 
                            book={book}
                            changeShelf={this.props.changeShelf}
                            currentShelf="read"
                          />
                        </li>
                      ))
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">

            {/*
            Link is like the <a></a> tag and it is used here to be able to move
            from one component into another.
            It is imported from 'react-router-dom'.
            */}
            <Link 
            to="/search"
            >Add a book</Link>
          </div>
        
        </div>
      );
    }
}

export default MainPage;