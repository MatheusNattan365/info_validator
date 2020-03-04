import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CssBaseline,
    TextField,
    Link,
    Container,
    Grid
} from '@material-ui/core';

import firebase from '../../services/firebaseConfig';

import img from '../../assets/logo_coint.png'

const useStyles = makeStyles(theme => ({
    paper: {
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
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#C42021',

    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        minWidth: 375,
        marginTop: 50
    },
}));

export default function SignIn(props) {
    const [signUp, setSignUp] = React.useState({
        email: '',
        password: '',
        copassword: ''
    })
    const classes = useStyles();
    let history = useHistory();

    const _handleClick = (event) => {
        event.preventDefault();
        const { email, password, copassword } = signUp;
        if (password != copassword) return alert('Passwords diferentes');
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                alert('Sua conta foi criada com sucesso!');
                history.push('/login')
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Card className={classes.root}>
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
                                autoFocus
                                value={signUp.email}
                                onChange={evt => setSignUp({ ...signUp, email: evt.target.value })}
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
                                value={signUp.password}
                                onChange={evt => setSignUp({ ...signUp, password: evt.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Confirmação do Password"
                                type="password"
                                value={signUp.copassword}
                                onChange={evt => setSignUp({ ...signUp, copassword: evt.target.value })}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(event) => _handleClick(event)}
                            >
                                CADASTRAR
                    </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/login" onClick={() => history.push("/login")} variant="body2">
                                        Faça o Login
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
