import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import ContactItem from './components/ContactItem';
import TblHeader from './components/TblHeader';
import Header from './components/Header';
import Form from './components/Form';

export default class AddressBook extends Component {
  state = {
    loading: false,
    contacts: [],
    formType: '',
    submit: null,
    activeFields: {
      id: '',
      first_name: '',
      last_name: '',
      home_phone: '',
      mobile_phone: '',
      work_phone: '',
      email: '',
      city: '',
      state_or_province: '',
      postal_code: '',
      country: ''
    },
    emptyFields: {}
  }

  componentDidMount(){
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    if(!abid) location = '/'
    else {
      this.setState({ loading: true })
      axios.get(`/contacts/${abid}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            contacts: res.data,
            emptyFields: this.state.activeFields,
            loading: false
          })
        })
    }
  }

  refreshAddressBook = () => {
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    if(!abid) location = '/'
    else {
      axios.get(`/contacts/${abid}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            formType: '',
            contacts: res.data,
            activeFields: this.state.emptyFields
          })
        })
    }
  }

  handleActiveFieldsChange = e => {
    const copyActiveFields = { ...this.state.activeFields };
    const { name, value } = e.target;
    copyActiveFields[name] = value;
    this.setState({ activeFields: copyActiveFields })
  }

  saveCreate = e => {
    e.preventDefault();
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    const data = { ...this.state.activeFields, addressbook_id: abid };
    axios.post('/ab/create', data, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => { this.refreshAddressBook() })
  }

  updateContact = e => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { id } = this.state.activeFields
    axios.patch(`/Contacts/update/${id}`, { ...this.state.activeFields }, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(res => { this.refreshAddressBook() })
  }

  deleteContact = e => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { id } = this.state.activeFields
    axios.delete(`/Contacts/delete/${id}`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(res => { this.refreshAddressBook() })
  }

  createBtn = () => {
    this.setState({
      activeFields: this.state.emptyFields,
      formType: 'create',
      submit: this.saveCreate,
    })
  }

  updateBtn = id => {
    const selectedFields = { ...this.state.contacts.find(c => c.id === id) }
    this.setState({
      activeFields: selectedFields,
      formType: 'update',
      submit: this.updateContact,
    })
  }

  deleteBtn = id => {
    const selectedFields = { ...this.state.contacts.find(c => c.id === id) }
    this.setState({
      activeFields: selectedFields,
      formType: 'delete',
      submit: this.deleteContact,
    })
  }

  cancelActive = () => {
    this.setState({
      activeFields: this.state.emptyFields,
      formType: '',
    })
  }

  logout = () => {
    localStorage.removeItem('user');
    location = '/'
  }

  render() {
    !localStorage.getItem('user') && this.logout()

    return (
      <Fragment>
        { this.state.formType && 
          <Form
            fields={this.state.activeFields}
            handleChange={this.handleActiveFieldsChange}
            submit={this.state.submit}
            cancel={this.cancelActive}
            formType={this.state.formType}
          />
        }
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12}>
              <Header 
                createBtn={this.createBtn}
                logout={this.logout}
              />
            </Grid>
            <Grid item xs={12}>
              {
                this.state.loading
                ? (<CircularProgress />)
                : (<Table>
                    <TblHeader />
                    <TableBody>
                      { this.state.contacts.map(contact => {
                          return <ContactItem 
                            key={contact.id} 
                            contact={contact} 
                            updateBtn={this.updateBtn}
                            deleteBtn={this.deleteBtn}
                          />
                        })
                      }
                    </TableBody>
                  </Table>
                )
              }
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}