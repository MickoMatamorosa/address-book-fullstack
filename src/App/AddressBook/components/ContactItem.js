import React, { Component, Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
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
      <TableCell>{ first_name }</TableCell>
      <TableCell>{ last_name }</TableCell>
      <TableCell>{ home_phone }</TableCell>
      <TableCell>{ mobile_phone }</TableCell>
      <TableCell>{ work_phone }</TableCell>
      <TableCell>{ email }</TableCell>
      <TableCell align="center">
        <IconButton onClick={ () => updateBtn(id) }><Edit /></IconButton>
        <IconButton onClick={ () => deleteBtn(id) }><Delete /></IconButton>
      </TableCell>
    </TableRow>
  )
}