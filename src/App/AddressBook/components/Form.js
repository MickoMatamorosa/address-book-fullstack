import React, { Fragment } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Form(props){
  const { fields, handleChange, cancel, submit, formType } = props;
  const { first_name,
          last_name,
          home_phone,
          mobile_phone,
          work_phone,
          email,
          city,
          state_or_province,
          postal_code,
          country, id } = fields;
  let dialogTitle = '';

  switch(formType){
    case 'create':
      dialogTitle = 'Create New Contact';
      break;
    case 'update':
      dialogTitle = 'Update Contact';
      break;
    case 'delete':
      dialogTitle = 'Delete Contact';
      break;
  }

  return (
    <Dialog open={ formType !== '' } onClose={ cancel } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{ dialogTitle }</DialogTitle>
        <DialogContent dividers>
          {
            formType==='delete'
            ? `Are you sure you want to delete ${first_name}'s contact?`
            : <Fragment>
                <TextField fullWidth required
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Firstname"
                  margin="dense"
                  name='first_name'
                  value={first_name}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Lastname"
                  margin="dense"
                  name='last_name'
                  value={last_name}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Home Phone"
                  margin="dense"
                  name='home_phone'
                  value={home_phone}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Mobile Phone"
                  margin="dense"
                  name='mobile_phone'
                  value={mobile_phone}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Work Phone"
                  margin="dense"
                  name='work_phone'
                  value={work_phone}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Email Address"
                  margin="dense"
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="City"
                  margin="dense"
                  name='city'
                  value={city}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="State or Province"
                  margin="dense"
                  name='state_or_province'
                  value={state_or_province}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Postal Code"
                  margin="dense"
                  name='postal_code'
                  value={postal_code}
                  onChange={handleChange}
                />
                <TextField fullWidth
                  disabled={formType==='delete'}
                  id="standard-dense"
                  label="Country"
                  margin="dense"
                  name='country'
                  value={country}
                  onChange={handleChange}
                />
              </Fragment>
          }
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={submit} color="primary">
            { formType==='delete' ? 'Yes' : formType }
          </Button>
          <Button variant="contained" onClick={cancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
}