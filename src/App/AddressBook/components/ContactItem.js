import React, { Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Remove from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

export default function ContactItem(props){
  const { contact, updateBtn, deleteBtn, removeBtn } = props,
        { first_name, last_name, home_phone,
          mobile_phone, work_phone, email, id } = contact;

  return (
    <TableRow>
      <TableCell>{ first_name }</TableCell>
      <TableCell>{ last_name }</TableCell>
      <TableCell>{ home_phone }</TableCell>
      <TableCell>{ mobile_phone }</TableCell>
      <TableCell>{ work_phone }</TableCell>
      <TableCell>{ email }</TableCell>
      <TableCell align="center">
        {
          removeBtn === undefined
          ? <Fragment>
              <IconButton onClick={ () => deleteBtn(id) }><Delete /></IconButton>
              <IconButton onClick={ () => updateBtn(id) }><Edit /></IconButton>
            </Fragment>
          : <IconButton onClick={ () => deleteBtn(id) }><Remove /></IconButton>
        }
      </TableCell>
    </TableRow>
  )
}