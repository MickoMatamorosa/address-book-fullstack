import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import Header from './components/Header';
import Form from './components/Form';
import ContactsView from './components/ContactsView';

export default class AddressBook extends Component {
  state = {
    loading: false,
    groupTab: false,
    sort: 'ASC',
    search: '',
    contacts: [],
    formType: '',
    submit: null,
    refresh: 0,
    errDialog: false,
    errMsg: '',
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
    const { sort, search } = this.state;
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    if(!abid) location = '/'
    else {
      this.setState({ loading: true })
      axios.get(`/contacts/${abid}/${sort}/${search}`, {
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.search !== this.state.search){
      this.refreshAddressBook();
    }
  }

  refreshAddressBook = () => {
    const { sort, search } = this.state;
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    if(!abid) location = '/'
    else {
      this.setState({ loading: true })
      axios.get(`/contacts/${abid}/${sort}/${search}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            formType: '',
            contacts: res.data,
            activeFields: this.state.emptyFields,
            loading: false
          })
        })
    }
  }

  handleActiveFieldsChange = e => {
    const copyActiveFields = { ...this.state.activeFields };
    const { name, value } = e.target;
    copyActiveFields[name] = value.replace(/^ /,'')
                              .replace(/  /,' ');

    this.setState({ activeFields: copyActiveFields })
  }

  saveCreate = e => {
    e.preventDefault();
    const { activeFields } = this.state;

    if(activeFields.first_name===''){
      this.setState({
        errDialog: true,
        errMsg: "First Name must be not empty!"
      })
    }else if(!activeFields.email.trim().match(/^([\.\w]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{2,}|)$/)){
      this.setState({
        errDialog: true,
        errMsg: "Invalid email address!"
      })
    }else{
      const { abid, token } = JSON.parse(localStorage.getItem('user'));
      const data = { ...activeFields, addressbook_id: abid };
      axios.post('/ab/create', data, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => { this.refreshAddressBook() })
    }
  }

  updateContact = e => {
    e.preventDefault();
    const { activeFields } = this.state;

    if(activeFields.first_name===''){
      this.setState({
        errDialog: true,
        errMsg: "First Name must be not empty!"
      })
    }else if(!activeFields.email.trim().match(/^([\.\w]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{2,}|)$/)){
      this.setState({
        errDialog: true,
        errMsg: "Invalid email address!"
      })
    }else{
      const { token } = JSON.parse(localStorage.getItem('user'));
      const { id } = this.state.activeFields
      axios.patch(`/Contacts/update/${id}`, { ...this.state.activeFields }, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => { this.refreshAddressBook() })
    }
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

  cancelErrMsg = () => {
    this.setState({
      errDialog: false,
      errMsg: ''
    })
  }

  sortFn = sort => {
    this.setState({ sort })
    this.refreshAddressBook()
  }

  searchHandleChange = e => {
    const search = e.target.value
                    .replace(/^ /,'')
                    .replace(/  /,' ');
    this.setState({ search })
  }

  refreshGroup = () => {
    this.setState({
      refresh: this.state.refresh + 1
    })
  }

  handleGroupTab = tab => {
    this.setState({ groupTab: tab })
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

        <Dialog open={this.state.errDialog} onClose={this.cancelErrMsg} aria-labelledby="add-member-group">
          <DialogTitle id="add-member-group">Error on Create</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.errMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelErrMsg} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Container maxWidth='lg' >
          <Paper style={{
            minHeight: '100vh',
            overflow: 'auto'
          }}>
            <Grid container>
              <Grid item xs={12}>
                <Header 
                  createBtn={this.createBtn}
                  logout={this.logout}
                  search={this.state.search}
                  searchFn={this.searchHandleChange}
                  groupTab={this.state.groupTab}
                />
              </Grid>
              <Grid item xs={12}>
                <ContactsView
                  loading={this.state.loading}
                  sort={this.state.sort} 
                  sortFn={this.sortFn}
                  contacts={this.state.contacts}
                  updateBtn={this.updateBtn}
                  deleteBtn={this.deleteBtn}
                  refresh={this.state.refresh}
                  refreshFn={this.refreshGroup}
                  handleGroupTab={this.handleGroupTab}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}