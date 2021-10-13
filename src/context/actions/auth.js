import {
  firebase,
  googleAuthProvider,
} from '../../services/firebase-config';

import Swal from 'sweetalert2';
import { types } from '../types/types';

import { cleanEntriesWhenUserLogout } from './entries';

/* ----- AUTH SECTION ----- */

/***
  action when the user log in
  @params -> email:string, password: string  
*/
export const startLoginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      dispatch(authAction(user.uid, user.displayName));
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
      console.error(err);
    }
  };
};

/***
  action for login with google auth
*/
export const startloginWithGoogle = () => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithPopup(googleAuthProvider);

      dispatch(
        authAction(user.uid, user.displayName, user.photoURL)
      );
    } catch (error) {
      console.error(error);
    }
  };
};

/***
  action for register a new user in firestore
  @params -> email:string, password: string, name: string  
*/
export const startRegisterWithEmailPasswordName = (
  email,
  password,
  name
) => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await user.updateProfile({ displayName: name });

      dispatch(authAction(user.uid, user.displayName));
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };
};

/* ----- LOG OUT SECTION ----- */

/***
  action for logout
*/
export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(cleanEntriesWhenUserLogout());
  };
};

/***
  reducer action for clean Redux store when the user has been log out
*/
export const logout = () => ({
  type: types.authLogout,
});

/***
  reducer action for multiple purposes 
  @params -> uid:int, displayName: string, photoURL: string  
*/
export const authAction = (uid, displayName, photoURL = '') => ({
  type: types.authAction,
  payload: {
    uid,
    displayName,
    photoURL,
  },
});
