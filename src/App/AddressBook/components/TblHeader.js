import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function TblHeader(){
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Firstname</TableCell>
        <TableCell align="center">Lastname</TableCell>
        <TableCell align="center">Home Phone</TableCell>
        <TableCell align="center">Mobile Phone</TableCell>
        <TableCell align="center">Work Phone</TableCell>
        <TableCell align="center">Email Address</TableCell>
        <TableCell align="center">City</TableCell>
        <TableCell align="center">State or Province</TableCell>
        <TableCell align="center">Postal Code</TableCell>
        <TableCell align="center">Country</TableCell>
        <TableCell align="center">Options</TableCell>
      </TableRow>
    </TableHead>
  )
}