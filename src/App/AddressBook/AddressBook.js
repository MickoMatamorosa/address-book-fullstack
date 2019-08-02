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

import ContactItem from './components/ContactItem';
import TblHeader from './components/TblHeader';
import Header from './components/Header';
import Create from './components/Create';
import Form from './components/Form';

export default class AddressBook extends Component {
  state = {
    contacts: [],
    create: false,
    update: false,
    delete: false,
    activeFields: {
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
    this.setState({
      emptyFields: this.state.activeFields
    })

    axios.get('/addressbook')
      .then(res => {
        this.setState({
          contacts: res.data
        })
      })
  }

  handleActiveFieldsChange = e => {
    const copyActiveFields = this.state.activeFields;
    const { name, value } = e.target;
    copyActiveFields[name] = value;
    this.setState({
      activeFields: copyActiveFields
    })
  }

  saveCreate = () => {
    const abid = JSON.parse(localStorage.getItem('user')).abid;
    const data = { ...this.state.activeFields, addressbook_id: abid };
    axios.post('/ab/create', data)
      .then(res => {
        this.setState({
          create: !this.state.create,
          activeFields: this.emptyFields
        })
        axios.get('/addressbook')
          .then(res => {
            this.setState({
              contacts: res.data
            })
          })
      })
  }

  createContact = () => {
    this.setState({
      activeFields: this.state.emptyFields,
      create: true,
      update: false,
      delete: false
    })
  }

  cancelActive = () => {
    this.setState({
      activeFields: this.state.emptyFields,
      create: false,
      update: false,
      delete: false
    })
  }

  updateBtn = () => {
    console.log('update')
    this.setState({
      create: false,
      update: true,
      delete: false
    })
  }

  deleteBtn = () => {
    console.log('delete')
    this.setState({
      create: false,
      update: false,
      delete: true
    })
  }

  updateContact = () => {
    
  }

  deleteContact = () => {
    
  }

  render() {
    return (
      <Fragment>
        {
          (this.state.update || this.state.delete) && 
          <Form
            fields={this.state.activeFields}
            handleChange={this.handleActiveFieldsChange}
            update={this.state.update}
            delete={this.state.delete}
            updateFn={this.updateContact}
            deleteFn={this.deleteContact}
            cancel={this.cancelActive}
          />
        }
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12}>
              <Header 
                create={this.state.create}
                createFn={this.createContact}
              />
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TblHeader />
                <TableBody>
                  {
                    this.state.create && 
                    <Create
                      fields={this.state.activeFields}
                      handleChange={this.handleActiveFieldsChange}
                      save={this.saveCreate}
                      cancel={this.cancelActive}
                    />
                  }{
                    this.state.contacts.map(contact => {
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
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
} 