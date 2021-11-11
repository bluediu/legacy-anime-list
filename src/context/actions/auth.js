// @ts-check
import {
  firebase,
  googleAuthProvider,
} from '../../services/firebase-config';

import Swal from 'sweetalert2';
import { types } from '../types/types';

import { cleanEntriesWhenUserLogout } from './entries';

/* ----- AUTH SECTION ----- */

/**
  Action when the user log in
  @Redux return a new action
  @param {string} email Email of the user
  @param {string} password Password of the user
*/
export const startLoginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      return dispatch(authAction(user.uid, user.displayName));
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
      console.error(err);
    }
  };
};

/**
 * Action for login with Google Sign In
 *  @Redux return a new action
 */
export const startloginWithGoogle = () => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithPopup(googleAuthProvider);

      return dispatch(
        authAction(user.uid, user.displayName, user.photoURL)
      );
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * Register a new user in firestore
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 * @param {string} name  Name of the user
 * @Redux return a new action
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

      return dispatch(authAction(user.uid, user.displayName));
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };
};

/* ----- LOG OUT SECTION ----- */

/**
 * Action for logout
 *  @Redux return an action
 */
export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(cleanEntriesWhenUserLogout());
  };
};

/**
  Action for clean Redux store when the user has been log out
  @Redux return a action
  @return {object} Type of the action
*/
export const logout = () => ({
  type: types.authLogout,
});

/**
 *
 * @param {string} uid Uid of the user
 * @param {string} displayName Name of the user
 * @param {string} photoURL Photo of the user
 * @returns {object} Type and Payload of the user action
 */
export const authAction = (uid, displayName, photoURL = '') => ({
  type: types.authAction,
  payload: {
    uid,
    displayName,
    photoURL,
  },
});
