import React, { useState } from 'react';
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
import axios from 'axios'
import Card from '@material-ui/core/Card'

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cont: {
    marginTop: 100
  },
  card: {
    padding: 10
  },
  err: {
    color: 'red'
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')
  const [ signUpErr, setSignUpErr ] = useState(false)
  const [ errMsg, setErrMsg ] = useState('')
  

  const redirectToHome = () => location = '/addressbook'

  localStorage.getItem('user') && redirectToHome()

  const submit = e => {
    e.preventDefault();

    if(password===password2){
      axios.get(`/signup/${username}`)
        .then(res => {
          if(res.data.length){
            setErrMsg('Username is already taken!');
            setSignUpErr(true);
            setPassword('');
            setPassword2('');
          }else{
            axios.post('/register', {
              username, password
            }).then((res) => {
                axios.get(`/login/addressbook/${res.data.id}`)
                .then((abRes) => {
                  res.data.abid = abRes.data[0].id
                  localStorage.setItem('user', JSON.stringify(res.data))
                  window.location = "/addressbook"
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    }else{
      setErrMsg('Password not matched!');
      setSignUpErr(true);
      setPassword('');
      setPassword2('');
    }
  }

  return (
    <Container className={classes.cont} component="main" maxWidth="xs">
      <CssBaseline />
      <Dialog open={ signUpErr } onClose={ () => setSignUpErr(false) } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign-Up Error!</DialogTitle>
        <DialogContent dividers className={classes.err}>
            {errMsg}
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => setSignUpErr(false) } color="primary">Ok</Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.card}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">Sign up</Typography>
        <form className={classes.form} onSubmit={e => submit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={e => setUsername(
                  e.target.value.replace(/^ /,'')
                                .replace(/  /,' ')
                )}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword2(e.target.value)}
                value={password2}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >Sign Up</Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Card>
    </Container>
  );
}