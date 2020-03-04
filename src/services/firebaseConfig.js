import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA8DrxlTLFTrY1EzzD9iYLmcTAwVeWU5So",
    authDomain: "socinv-12ad8.firebaseapp.com",
    databaseURL: "https://socinv-12ad8.firebaseio.com",
    projectId: "socinv-12ad8",
    storageBucket: "socinv-12ad8.appspot.com",
    messagingSenderId: "954963335847",
    appId: "1:954963335847:web:3d83b2a296348727cd1982",
    measurementId: "G-PW6SMB3X5S"
  };

  export default firebase.initializeApp(firebaseConfig);