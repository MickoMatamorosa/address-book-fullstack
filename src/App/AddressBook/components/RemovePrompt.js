import React from 'react';
import Axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AlertDialog({
  open,
  handleClose,
  selected,
  refreshFn
}) {

  function handleRemove(){
    const { token } = JSON.parse(localStorage.getItem('user'));
    Axios.delete(`/group/members/remove/${selected.gid}`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => { 
      refreshFn('ASC');
      handleClose();
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove from Group</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {selected.first_name}  {selected.last_name} from the group
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