import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateGroup(props) {
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);
  const [group_name, setGroupName] = React.useState('');

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setGroupName('')
  }

  function createGroup(e){
    e.preventDefault();
    const { abid, token } = JSON.parse(localStorage.getItem('user'));
    const data = { group_name, addressbook_id: abid };

    axios.get(`/groups/${abid}`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => {
      return res.data.filter(group => 
        group.group_name === group_name
      ) > -1
    })
    .then(res => {
      if(res){
        axios.post('/groups/create', data, {
            headers: { "Authorization": `Bearer ${token}` }
          })
          .then(res => { 
            props.refreshFn();
            setOpen(false);
            setGroupName('');
          })
      } else {
        setErrOpen(true);
        setOpen(false);
      }
    })
  }

  function handleCloseErr(){
    setErrOpen(false);
    setOpen(true);
    setGroupName('');
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Group
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-create-group">
        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="group_name"
            label="Group Name"
            type="text"
            fullWidth
            onChange={e => setGroupName(
              e.target.value.replace(/^ /,'')
                            .replace(/  /,' ')
            )}
            value={group_name}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={createGroup}>
            Create
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={errOpen} onClose={handleCloseErr} aria-labelledby="group-name-error">
        <DialogTitle id="group-name-error">Group Name Invalid!</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Group name "{group_name}" already taken!</DialogContentText>
          <DialogContentText>Please use other group name. Thank you!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseErr} color="secondary">Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

