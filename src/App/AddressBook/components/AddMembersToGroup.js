import React, { Fragment, Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AddMembers extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(props){

  }

  render(){
    const { openAddMember, selectedGroup, cancel } = this.props;

    return <Fragment>
            <Dialog open={openAddMember} onClose={cancel} aria-labelledby="add-member-group">
              <DialogTitle id="add-member-group">{selectedGroup.group_name} Group</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.addMembers} color="primary">
                  Add Members
                </Button>
                <Button onClick={cancel} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
  }
}