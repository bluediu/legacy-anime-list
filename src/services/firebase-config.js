import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'animelist-db8a7.firebaseapp.com',
  projectId: 'animelist-db8a7',
  storageBucket: 'animelist-db8a7.appspot.com',
  messagingSenderId: '838751701995',
  appId: '1:838751701995:web:c11ffaaab5ee0a8e0aa7ae',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider =
  new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
