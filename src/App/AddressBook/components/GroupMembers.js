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
      open: false,
      selected: {},
    }
  }

  componentDidMount(){
    const { members } = this.state;
    const { group_name } = this.props;

    const { abid, token } = JSON.parse(localStorage.getItem('user'));

    if(!abid) location = '/'
    else {
      this.setState({ loading: true })
      axios.get(`/group/${abid}/members/${group_name}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            members: res.data,
            loading: false
          })
        })
    }
  }

  removeBtn = id => {
    const selectedFields = { ...this.state.members.find(c => c.id === id) }
    // console.log(selectedFields)

    this.setState({
      selectedId: id,
      open: true
    })
  }

  cancelRemove = () => {
    this.setState({open: false})
  }

  render(){
    const { members, open, selectedId } = this.state;
    const { sort, sortFn } = this.props;

    return (
      <Fragment>
        { members.length === 0 
          ? "This group has no member" 
          : <Fragment>
              <RemovePrompt 
                open={open} 
                handleClose={this.cancelRemove} 
                selected={selectedId}
              />
              <Table>
                <TblHeader 
                  sort={sort} 
                  sortFn={sortFn}
                />
                <TableBody>
                  { members.map(contact => {
                      return <ContactItem 
                        key={contact.id}
                        contact={contact}
                        removeBtn={this.removeBtn}
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