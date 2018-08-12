import React, { Component } from 'react'

class Book extends Component {
    render () {
        /*
         * hasThumbnail variable is used to deal with the fact that not all books
         * have a thumbnail image. When we search for a book the variable checks 
         * whether it has a thumbnail and either displays it by updating the url property
         * in the book-cover class below or shows a white empty page 
         * in the place of thumbnail. 
         */
        let hasThumbnail
        if (this.props.book.imageLinks) {
            hasThumbnail = this.props.book.imageLinks.thumbnail
        } else {
            hasThumbnail = ''
        }
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, 
                        height: 193, backgroundImage: `url("${hasThumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select
                                onChange={(e) => this.props.changeShelf(this.props.book, 
                                    e.target.value)}
                                value={this.props.currentShelf}
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}

export default Book;