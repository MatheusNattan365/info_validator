import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../services/firebaseConfig';

import img from '../../assets/logo_coint.png'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(1),
    height: 195,
    width: 360,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#C42021',

  },
  root: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    minWidth: 375,
    marginTop: 50
  },
}));

export default function SignIn(props) {
  const [login, setLogin] = React.useState({
    email: '',
    password: ''
  })
  const classes = useStyles();
  let history = useHistory();

  const _handleClick = async (event) => {
    event.preventDefault();
    const { email, password } = login;
    await firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('userID', res.user.uid)
        history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  useEffect(() => {
    fireUser()
  }, [])

  async function fireUser() {
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        history.push('/dashboard')
      } else {
        return null
      };
    });
  }
  
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Card className={classes.root} >
        <Avatar src={img} variant="square" className={classes.avatar} />
        <CardContent>
          <div className={classes.paper}>
            <br />
            <br />
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={login.email}
                onChange={evt => setLogin({ ...login, email: evt.target.value })}
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
                value={login.password}
                onChange={evt => setLogin({ ...login, password: evt.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => _handleClick(event)}
              >
                Entrar
          </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/registration" onClick={() => history.push("/registration")} variant="body2">
                    Crie uma conta
              </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>

    </Container>
  );
}
