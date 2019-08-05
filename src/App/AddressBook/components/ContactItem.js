import React, { Component, Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

export default function ContactItem(props){
  const { contact, updateBtn, deleteBtn } = props,
        { first_name, last_name, home_phone,
          mobile_phone, work_phone, email,
          city, state_or_province, postal_code,
          country, id } = contact;

  
  return (
    <TableRow>
      <TableCell align="center">{ first_name }</TableCell>
      <TableCell align="center">{ last_name }</TableCell>
      <TableCell align="center">{ home_phone }</TableCell>
      <TableCell align="center">{ mobile_phone }</TableCell>
      <TableCell align="center">{ work_phone }</TableCell>
      <TableCell align="center">{ email }</TableCell>
      <TableCell align="center">{ city }</TableCell>
      <TableCell align="center">{ state_or_province }</TableCell>
      <TableCell align="center">{ postal_code }</TableCell>
      <TableCell align="center">{ country }</TableCell>
      <TableCell align="center">
        <IconButton onClick={ () => updateBtn(id) }><Edit /></IconButton>
        <IconButton onClick={ () => deleteBtn(id) }><Delete /></IconButton>
      </TableCell>
    </TableRow>
  )
}