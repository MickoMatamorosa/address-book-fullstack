import React, { Component, Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Cancel from '@material-ui/icons/Cancel';
import Save from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core';

export default function Create(props){
  const { fields, handleChange, cancel, save } = props;
  const { first_name,
          last_name,
          home_phone,
          mobile_phone,
          work_phone,
          email,
          city,
          state_or_province,
          postal_code,
          country } = fields;

  return (
    <TableRow>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Firstname"
          margin="dense"
          name='first_name'
          value={first_name}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Lastname"
          margin="dense"
          name='last_name'
          value={last_name}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Home Phone"
          margin="dense"
          name='home_phone'
          value={home_phone}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Mobile Phone"
          margin="dense"
          name='mobile_phone'
          value={mobile_phone}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Work Phone"
          margin="dense"
          name='work_phone'
          value={work_phone}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Email Address"
          margin="dense"
          name='email'
          value={email}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="City"
          margin="dense"
          name='city'
          value={city}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="State or Province"
          margin="dense"
          name='state_or_province'
          value={state_or_province}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Postal Code"
          margin="dense"
          name='postal_code'
          value={postal_code}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <TextField fullWidth
          id="standard-dense"
          label="Country"
          margin="dense"
          name='country'
          value={country}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={save}><Save/></IconButton>
        <IconButton onClick={cancel}><Cancel/></IconButton>
      </TableCell>
    </TableRow>
  )
}