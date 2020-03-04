import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import firebase from '../services/firebaseConfig';

// imported Pages
import RegisterPage from './AuthPages/RegisterPage';
import LogingPage from './AuthPages/LoginPage';
import DashBoard from './AppPages/Paperbase';




export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(null);

  useEffect(() => {
    fireUser()
  },[loggedIn])

  async function fireUser() {
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setLoggedIn(firebaseUser)
      } else {
        setLoggedIn(null)
      };
    });
  }


  return (
    <Router>
      <Switch>
        <Route path="/login" component={LogingPage} />
        <Route path="/registration" component={RegisterPage} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <LogingPage />}
        </Route>
      </Switch>
    </Router>
  );
}

