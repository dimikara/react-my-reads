import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
// import sortBy from 'sort-by'
import Book from '../Components/Book'
// import NoSearchResults from '../Components/NoSearchResults'

class SearchPage extends Component {
    /*
    * Following the logic of "Contacts" app in the lesson.
    */
    state = {
        query: '',
        /* 
        * The matchedBooks array will hold the books that match the search query, 
        * so it has to start as an empty array
        */
        matchedBooks: []
    }

    /* 
    * What happens when the user inputs text in the Search field?
    * As expected, a search occurs for the entered query. 
    * The backend API uses a fixed set of cached search results 
    * and is limited to a particular set of search terms, which can be found on
    * https://github.com/dimikara/react-my-reads/blob/master/SEARCH_TERMS.md.
    * Note that this list of terms are the ONLY terms that will work with the 
    * backend server, as per the README file instructions.
    */
    updateQuery = (query) => {
        /*
        * Using .trim() method creates an issue: the spacebar key at the input box 
        * is not working when pressed. Issue resolved with the suggestion found on:
        * https://github.com/udacity/reactnd-contacts-complete/commit/ce3a9a8a0f1d8d0224eba663e512cd309fb1f804 
        * Note to self: Check the `debounce` feature suggested in the above page.
        */
        let trimmedQuery = query.replace(/^\s+/, '')
        this.setState({
            query: trimmedQuery
        })
        /*
        * When the query is updated (i.e. entered) I also have to update 
        * the matchedBooks array through the fetchMatchedBooks method.
        */
        this.fetchMatchedBooks(query)
    }

    /*
    * Same logic as in the App.js file and again following the logic of the "Contacts"
    * app construction as in the course.
    * The search(query) is used as per the README file instructions. 
    * "query" is a <String> and should return a promise.
    */
    fetchMatchedBooks = (query) => {
        /*
        * In order to fetch matched books there has to be a query.
        * This is the case covered with the "if" part.
        * If there is no query i.e. nothing entered in the Search field,
        * the matchedBooks array remains empty.
        */
        if (query.length !==0) {
            BooksAPI.search(query).then((matchedBooks) => {
                /*
                * The nested "if" covers the case of an error.
                * For example, if I type something that returns no result,
                * the resulting object will still have to be an array
                * otherwise the app will crash when the .map() method
                * will be run. 
                */
                if (matchedBooks.error) {
                    this.setState({ matchedBooks: [] })
                } else {
                    this.setState({ matchedBooks: matchedBooks })
                    // console.log(matchedBooks);
                }
            }
            )
        } else {
            this.setState ({ matchedBooks: [] })
        }
    }

    render () {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    
                {/*
                Link is like the <a></a> tag and it is used here to be able to move
                from one component into another. It is imported from 'react-router-dom'.
                */}
                    <Link 
                        to="/"
                        className="close-search"
                    >Close</Link>
                
                    <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. 
                    So, don't worry if you don't find a specific author or title. 
                    Every search is limited by search terms.
                    */}
                        <input 
                        type="text"
                        placeholder="Search by title or author"
                        /* 
                        * The "value" property is necessary otherwise the input field
                        * becomes "Uncontrolled", an element that behaves as the usual
                        * HTML input element.
                        */
                        value={this.state.query}
                        /*
                        * When writing in the Search field, the query state changes
                        * according to the value 
                        */
                        onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
            
            <div className="search-books-results">
              <ol className="books-grid">
              {/*
              * Fetching the books that match the query (array) and mapping through them
              */}
                    {   
                        this.state.matchedBooks.map(matchedBook => {
                            /*
                            * "shelf" variable should have the value "none" originally
                            * as all books not included in the currently reading, want to read
                            * and read shelves should have this 'none' state.
                            */
                            let shelf = "none"
                            /* 
                            * Mapping through all the "books".
                            * If a matched book does not belong to the books i.e. to 
                            * a category ("shelf"), then this book's shelf will get 
                            * the value "none". Otherwise, it gets the shelf value 
                            * that the book already has in "books".
                            */
                            this.props.books.forEach(book => {
                                if (book.id !== matchedBook.id) {
                                    matchedBook.shelf = "none"
                                } else {
                                    shelf = book.shelf
                                }
                            })
                            
                            return(
                                <li key={matchedBook.id}>
                                <Book 
                                    book={matchedBook}
                                    changeShelf={this.props.changeShelf}
                                    currentShelf={shelf}
                                />
                            </li>

                            )
                        }
                        )
                    }
              </ol>
            </div>
            </div>
        );
    }
}

export default SearchPage;