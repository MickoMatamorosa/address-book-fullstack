import React, { Fragment, Component } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class AddMembers extends Component{
  constructor(props){
    super(props);
    this.state = {
      contacts: [],
      selectedContacts: [],
    }
  }

  componentDidMount(){
    const { abid, token } = JSON.parse(localStorage.getItem('user'));

    if(!abid) location = '/'
    else {
      const { group_name } = this.props.selectedGroup;
      
      axios.get(`/group/${abid}/not-members/${group_name}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            contacts: res.data,
          })
        })
    }
  }

  componentDidUpdate(props) {
    const { group_name } = this.props.selectedGroup;
    const gName = props.selectedGroup.group_name;
    
    if ( gName !== group_name) {
      const { abid, token } = JSON.parse(localStorage.getItem('user'));
      const groupName = gName === undefined ? group_name : gName;
      
      axios.get(`/group/${abid}/not-members/${groupName}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            contacts: res.data,
            selectedContacts: []
          })
        })
    }
  }

  handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ selectedContacts: value })
  }

  cancelAdd = () => {
    this.props.cancel()
    this.setState({selectedContacts: []})
  }

  render(){
    const { openAddMember, selectedGroup, addContacts } = this.props;
    const { contacts, selectedContacts, } = this.state
    
    return <Fragment>
            <Dialog open={openAddMember} onClose={this.cancelAdd} aria-labelledby="add-member-group">
              <DialogTitle id="add-member-group">{selectedGroup.group_name} Group</DialogTitle>
              <DialogContent dividers>
                { contacts.length > 0
                  ? <FormControl>
                      <InputLabel shrink htmlFor="select-multiple-native">
                        Contacts
                      </InputLabel>
                      <Select
                        multiple
                        native
                        value={selectedContacts}
                        onChange={this.handleChangeMultiple}
                        inputProps={{
                          id: 'select-multiple-native',
                        }}
                      >
                        { contacts.map(contact => (
                              <option key={contact.id} value={contact.id}>
                                {contact.last_name}, {contact.first_name}
                              </option>
                            ))
                        }
                      </Select>
                    </FormControl>
                  : <DialogContentText>All Contacts are already added!</DialogContentText>
                }                
              </DialogContent>
              <DialogActions>
                <Button disabled={selectedContacts.length===0} onClick={e => addContacts(selectedGroup.group_name, selectedContacts)} color="primary">
                  Add
                </Button>
                <Button onClick={this.cancelAdd} color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
  }
}