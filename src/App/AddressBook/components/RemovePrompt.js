import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({
  open,
  handleClose,
  selected
}) {

  const handleRemove = () => {

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Group Member</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove "name" from "group"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemove} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}