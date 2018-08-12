import React, { Component } from 'react'

import SearchPage from './Components/SearchPage'
import MainPage from './Components/MainPage'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css';

class BooksApp extends Component {
  /* 
  * The list of books is the first of the identified states.
  * It should live here in the App page as it basically appears here.
  * "books" should be an array as this is the best way to represent them,
  * plus we can use the map/filter methods to go through the items. 
  */
  state = {
    books: []
  }

  /* 
  * componentDidMount() method is called when the component is created.
  * I'm following the logic, as described on the course during the creation of "Contacts" app.
  * Once the component has been mounted, the componentDidMount() lifecycle event occurs.
  * The getAll() method from the BooksAPI is run and all the books are downloaded from 
  * the Udacity books database. When the data is returned, setState() is called and 
  * the books array is updated to its state. Since the state has changed, render() gets
  * called again and this re-renders the page with the books having a state.
  */

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    }
    )
  }
  

  /* 
  * I create the changeShelf method to move a book between shelves.
  * this.props: connects components and passes the properties 
  * from parent ('App') to child ('MainPage').
  * In changeShelf method I am using the 'update' method of the 
  * backend server provided by Udacity. See the Readme for details.
  */
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)

  /* 
  * Here I call again the method to make React re-render the App page
  * in order to see the change on the fly.
  * Another option would be to use: this.forceUpdate() in order to force
  * the re-rendering of the component with the new data. 
  * For reference, React documentation: 
  * https://reactjs.org/docs/integrating-with-other-libraries.html#using-backbone-models-in-react-components
  */
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    }
    )
  }

  /*
  * Importing the Router & using "exact path"
  */

  render() {
    return (
      <div className="app">

        {/*
        React router does partial matching, so we use the `exact` param to disable the 
        partial matching for a route and make sure that it will only return the route 
        if the path is an EXACT match to the current URL. Since in this case only one 
        component should be rendered, we are using `exact path`. See also: 
        https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path
        */}
        <Route exact path="/" render={() => (
          <MainPage
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchPage 
          changeShelf={this.changeShelf}
          books={this.state.books}
          />
        )}/>
        
      </div> 
    )
  }
}

export default BooksApp
