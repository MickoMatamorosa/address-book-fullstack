import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase, Typography, Fab, Grid } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';

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
      alignItems="center"
      className={classes.header}
    >
      <Grid item xs={4}>
        <Typography variant="h2" gutterBottom>Address Book</Typography>
      </Grid>
      <Grid item xs={8}>
        <Grid container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
        >
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
            />
          </div>
          <Fab 
            variant="extended" 
            color="primary" 
            aria-label="add" 
            onClick={props.createBtn} >
            <AddIcon /> Create
          </Fab>
          <ExitToApp 
            color="error" 
            onClick={props.logout}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}