import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function TblHeader(props){
  return (
    <Grid container
    direction="row"
    justify="space-evenly"
    alignItems="center">
      <Grid item xs={11}>
        <Typography variant="h2" gutterBottom>Address Book</Typography>
      </Grid>
      <Grid item xs={1}>
        { 
          !props.create &&
          <Fab 
            variant="extended" 
            color="primary" 
            aria-label="add" 
            onClick={props.createFn} >
            <AddIcon /> Create
          </Fab>
        }
      </Grid>
    </Grid>
  )
}