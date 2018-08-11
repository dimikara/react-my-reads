import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'


/*
I import the router above and here I'm putting <App /> 
* between <BrowserRouter> tags
*/

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'))
