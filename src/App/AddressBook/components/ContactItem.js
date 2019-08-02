import React, { Component, Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

export default function ContactItem(props){
  const { contact, updateBtn, deleteBtn } = props;
  
  return (
    <TableRow>
      <TableCell align="center">{ contact.first_name }</TableCell>
      <TableCell align="center">{ contact.last_name }</TableCell>
      <TableCell align="center">{ contact.home_phone }</TableCell>
      <TableCell align="center">{ contact.mobile_phone }</TableCell>
      <TableCell align="center">{ contact.work_phone }</TableCell>
      <TableCell align="center">{ contact.email }</TableCell>
      <TableCell align="center">{ contact.city }</TableCell>
      <TableCell align="center">{ contact.state_or_province }</TableCell>
      <TableCell align="center">{ contact.postal_code }</TableCell>
      <TableCell align="center">{ contact.country }</TableCell>
      <TableCell align="center">
        <IconButton onClick={updateBtn}><Edit /></IconButton>
        <IconButton onClick={deleteBtn}><Delete /></IconButton>
      </TableCell>
    </TableRow>
  )
}