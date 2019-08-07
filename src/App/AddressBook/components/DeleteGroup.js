import React, { Fragment } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default props => {
  return <Fragment>
          <Dialog open={props.openDeleteGroup} onClose={props.cancel} aria-labelledby="delete-group">
            <DialogTitle id="delete-group">{props.selectedGroup.group_name} Group</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this group
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.deleteGroup} color="primary">
                Delete
              </Button>
              <Button onClick={props.cancel} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
}