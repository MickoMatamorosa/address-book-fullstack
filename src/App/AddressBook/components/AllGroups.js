import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import GroupMembers from './GroupMembers';
import { IconButton } from '@material-ui/core';
import DeleteGroup from './DeleteGroup';
import AddMembersToGroup from './AddMembersToGroup';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default class AllGroups extends  Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      expanded: '',
      groups: [],
      refresh: null,
      selectedGroup: {},
      openDeleteGroup: false,
      openAddMember: false,
    }
  }

  componentDidMount(){
    const { abid, token } = JSON.parse(localStorage.getItem('user'));

    if(!abid) location = '/'
    else {
      this.setState({ loading: true })
      axios.get(`/groups/${abid}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => {
          this.setState({
            groups: res.data,
            loading: false,
            refresh: this.props.refresh
          })
        })
    }
  }

  componentDidUpdate(props) {
    const { refresh } = this.props;
    if (props.refresh !== refresh) {
      this.refreshGroupList();      
    }
  }

  refreshGroupList = () => {
    const { abid, token } = JSON.parse(localStorage.getItem('user'));

    this.setState({ loading: true })

    axios.get(`/groups/${abid}`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(res => {
        this.setState({
          groups: res.data,
          loading: false
        })
      })
  }

  deleteBtn = id => {
    const selectedGroup = { ...this.state.groups.find(g => g.id === id) }
    this.setState({
      selectedGroup,
      openDeleteGroup: true,
      openAddMember: false,
    })
  }

  addMemberBtn = id => {
    const selectedGroup = { ...this.state.groups.find(g => g.id === id) }
    this.setState({
      selectedGroup,
      openAddMember: true,
      openDeleteGroup: false,
    })
  }

  handleChange = panel => (event, newExpanded) => {
    this.setState({
      expanded : newExpanded ? panel : false
    });
  };

  addContacts = (group_name, contacts) => {
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    const data = { group_name, abid, contacts}
    axios.post(`/group/members/add`, data, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => { 
      this.props.refreshFn();
      this.cancel();
    })
  }

  deleteGroup = e => {
    e.preventDefault();
    const { group_name, addressbook_id } = this.state.selectedGroup

    const { token } = JSON.parse(localStorage.getItem('user'));
    
    axios.delete(`/group/${addressbook_id}/delete/${group_name}`, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then(res => { 
        this.refreshGroupList();
        this.setState({
          selectedGroup: {},
          openDeleteGroup: false
        })
      })
  }

  cancel = () => {
    this.setState({
      selectedGroup: {},
      openDeleteGroup: false,
      openAddMember: false,
    })
  }

  
  render(){
    const { expanded, groups, openDeleteGroup, openAddMember, selectedGroup } = this.state;
    const { sort, sortFn } = this.props;
    
    return (
      <div style={{marginTop: 20}}>
        <DeleteGroup 
          openDeleteGroup={openDeleteGroup}
          selectedGroup={selectedGroup}
          cancel={this.cancel}
          deleteGroup={this.deleteGroup}
        />
        <AddMembersToGroup 
          openAddMember={openAddMember}
          selectedGroup={selectedGroup}
          cancel={this.cancel}
          addContacts={this.addContacts}
        />

        { groups.map(group => {
            return (<ExpansionPanel key={group.id} square 
                      expanded={expanded === group.group_name}
                      onChange={this.handleChange(group.group_name)}>
                <ExpansionPanelSummary aria-controls={`${group.group_name}-content`} id={`${group.group_name}-header`}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Grid container justify="flex-start" alignItems="center">
                        <Grid item>{group.group_name}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container justify="flex-end" alignItems="center">
                        <IconButton onClick={() => this.addMemberBtn(group.id) }>
                          <Add />
                        </IconButton>
                        <IconButton onClick={() => this.deleteBtn(group.id) }>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <GroupMembers 
                    sort={sort} 
                    sortFn={sortFn}
                    group_name={group.group_name} 
                    refresh={this.props.refresh}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        }
      </div>
    );
  }
}