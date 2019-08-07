import React, { Fragment } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase, Typography, Fab, Grid } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import Group from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  header: {
    color: '#bbb',
    backgroundColor: '#1e90ff',
    padding: 15
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

export default function Header(props){
  const classes = useStyles();
  
  return (
    <Grid container
      direction="row"
      justify="space-evenly"
      alignItems="baseline"
      className={classes.header}
    >
      <Grid item xs={12} md={5}>
        <Typography variant="h2" gutterBottom>Address Book</Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <Grid container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
        >
          { !props.groupTab && 
            <Fragment>
              <Grid item xs='auto'>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={props.search}
                    onChange={props.searchFn}
                  />
                </div>
              </Grid>
              <Grid item xs='auto'>
                <Fab 
                  variant="extended" 
                  color="primary" 
                  aria-label="add" 
                  onClick={props.createBtn} >
                  <AddIcon /> Create
                </Fab>
              </Grid>
            </Fragment>
          }
          <Grid item xs='auto'>
            <IconButton onClick={props.logout}>
              <ExitToApp color="error"/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}