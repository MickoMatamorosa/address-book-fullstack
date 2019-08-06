import React, { useState } from 'react';
import axios from 'axios'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loginErr, setLoginErr ] = useState(false)

  const redirectToHome = () => location = '/addressbook'

  localStorage.getItem('user') && redirectToHome()

  const submit = e => {
    e.preventDefault();
    axios.post('/', { username, password })
      .then((res) => {
        axios.get(`/login/addressbook/${res.data.id}`)
          .then((abRes) => {
            res.data.abid = abRes.data[0].id
            localStorage.setItem('user', JSON.stringify(res.data))
            window.location = "/addressbook"
          });
      })
      .catch((error) => {
        setLoginErr(true)
        setPassword('')
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Dialog open={ loginErr } onClose={ () => setLoginErr(false) } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log-In Error!</DialogTitle>
        <DialogContent>
            Invalid Username or Password!
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => setLoginErr(false) } color="primary">Ok</Button>
        </DialogActions>
      </Dialog>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={e => setUsername(e.target.value )}
            value={username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value )}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          > Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}