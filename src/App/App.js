import React, { Component, useEffect } from 'react';
import axios from 'axios'
import SignIn from './public/SignIn';
import SignUp from './public/SignUp';
import AddressBook from './AddressBook/AddressBook';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route 
          exact path="/" component={SignIn} 
        />
        <Route 
          path="/register" 
          render={ props => <SignUp {...props} /> } 
        />
        <Route path="/addressbook" component={AddressBook} />
      </Router>
    );
  }
}