import React, { Component } from 'react';
import axios from 'axios'
import SignIn from './public/SignIn';
import SignUp from './public/SignUp';
import AddressBook from './AddressBook/AddressBook';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default class App extends Component {
  state = {
    regisFields:  {
      username:  '',
      password:  '',
      firstname: '',
      lastname:  '',
      emailAdd:  '',
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    let regisFields = this.state.regisFields;
    regisFields[name] = value;
    this.setState({ regisFields })
  }

  regisOnSubmit = (e) => {
    e.preventDefault();
    console.log('submitted')
    // axios.post('http://localhost:3002/register', ...this.state.regisFields)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <Router>
          <Route 
            exact path="/" component={SignIn} 
          />
          <Route 
            path="/register" 
            render={
              () => <SignUp
                handleChange={this.handleChange}
                regisFields={this.state.regisFields}
                submit={this.regisOnSubmit}
              />
            } 
          />
          <Route path="/addressbook" component={AddressBook} />
      </Router>
    );
  }
}