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
    axios.post('/groups/create', data, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => { props.refreshFn() })
    setOpen(false);
    setGroupName('');
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Group
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-create-group">
        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="group_name"
            label="Group Name"
            type="text"
            fullWidth
            onChange={e => setGroupName(e.target.value)}
            value={group_name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={createGroup} color="primary">
            Create
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

