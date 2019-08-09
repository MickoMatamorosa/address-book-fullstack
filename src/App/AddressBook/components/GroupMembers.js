import React, { Component, Fragment } from 'react';
import axios from 'axios'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TblHeader from './TblHeader';
import ContactItem from './ContactItem'
import RemovePrompt from './RemovePrompt'

export default class GroupMembers extends Component{
  constructor(props){
    super(props);
    this.state = {
      members: [],
      openRemoveDialog: false,
      selectedFields: {},
      sort: 'ASC'
    }
  }

  componentDidMount(){
    const { group_name } = this.props;
    const { sort } = this.state;

    const { abid, token } = JSON.parse(localStorage.getItem('user'));

    if(!abid) location = '/'
    else {
      axios.get(`/group/${abid}/members/${group_name}/${sort}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            members: res.data
          })
        })
    }
  }

  componentDidUpdate(props) {
    const { refresh } = this.props;
    if (props.refresh !== refresh) {
      this.refreshMembers('ASC');
    }
  }

  refreshMembers = sort => {
    const { group_name } = this.props;
    
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    axios.get(`/group/${abid}/members/${group_name}/${sort}`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => {
      this.setState({
        members: res.data,
        sort
      })
    })
  }

  removeBtn = id => {
    const selectedFields = { ...this.state.members.find(c => c.id === id) }
    
    this.setState({
      selectedFields,
      openRemoveDialog: true
    })
  }

  cancelRemove = () => {
    this.setState({
      selectedFields: {},
      openRemoveDialog: false,
    })
  }

  render(){
    const { members, openRemoveDialog, selectedFields, sort } = this.state;

    return (
      <Fragment>
        { members.length === 0 
          ? "This group has no member" 
          : <Fragment>
              <RemovePrompt 
                open={openRemoveDialog} 
                handleClose={this.cancelRemove} 
                refreshFn={this.refreshMembers}
                selected={selectedFields}
              />
              <Table>
                <TblHeader 
                  sort={sort} 
                  sortFn={this.refreshMembers}
                />
                <TableBody>
                  { members.map(contact => {
                      return <ContactItem 
                        key={contact.id}
                        contact={contact}
                        removeBtn={this.removeBtn}
                        cancel={this.cancelRemove}
                      />
                    })
                  }
                </TableBody>
              </Table>
            </Fragment>
        }
      </Fragment>
    );
  }
}