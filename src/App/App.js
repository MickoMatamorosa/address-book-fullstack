import React, { Component } from 'react';
import SignIn from './public/SignIn';
import SignUp from './public/SignUp';
import AddressBook from './AddressBook/AddressBook';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default class App extends Component {
  state = {
    username:  '',
    password:  '',
    firstname: '',
    lastname:  '',
    emailAdd:  '',
  }

  render() {
    return (
      <Router>
          <Route exact path="/" component={SignIn} />
          <Route path="/register" component={SignUp} />
          <Route path="/addressbook" component={AddressBook} />
      </Router>
    );
  }
}