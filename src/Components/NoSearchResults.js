import React, { Component } from 'react'

class NoSearchResults extends Component {
    render () {
        return(
            <div className='no-search-results'>
                <h2>Sorry, your search returned no results.</h2>
                <h2>Try again, or return to home page.</h2>
            </div>
        )
    }
}

export default NoSearchResults