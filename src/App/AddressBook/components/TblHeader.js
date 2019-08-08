import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function TblHeader({ sort, sortFn }){
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">Firstname</TableCell>
        <TableCell align="left">
          Lastname
          { sort === 'ASC'
            ? <IconButton aria-label="descending" 
                size="small"
                onClick={() => sortFn('DESC')}
              >
                <ArrowDownward fontSize="inherit" />
              </IconButton>
            : <IconButton 
                aria-label="ascending" 
                size="small"
                onClick={() => sortFn('ASC')}
              >
                <ArrowUpward fontSize="inherit" />
              </IconButton>
          }
        </TableCell>
        <Hidden smDown>
          <TableCell align="left">Home Phone</TableCell>
        </Hidden>
        <Hidden xsDown>
          <TableCell align="left">Mobile Phone</TableCell>
        </Hidden>
        <Hidden smDown>
          <TableCell align="left">Work Phone</TableCell>
        </Hidden>
        <Hidden mdDown>
          <TableCell align="left">Email Address</TableCell>
        </Hidden>
        <TableCell align="center">Options</TableCell>
      </TableRow>
    </TableHead>
  )
}