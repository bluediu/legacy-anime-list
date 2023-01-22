import {
  firebase,
  googleAuthProvider,
} from '../../services/firebase-config';

import Swal from 'sweetalert2';
import { types } from '../types/types';

import { cleanEntriesWhenUserLogout } from './entries';

/* ----- AUTH SECTION ----- */

/**
 * Function when the user log in
 * @Redux return a new action
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 * @Redux {Dispatch}
 * @returns {Function} Function of type Auth Action
 */
export const startLoginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      return dispatch(authAction(user.uid, user.displayName));
    } catch (err) {
      const msg = `Usuario o contraseña invalido o es posible que el usuario haya sido eliminado.`;
      await Swal.fire('Error', msg, 'error');
      console.error(err);
    }
  };
};

/**
 * Function for login with Google Sign In
 * @Redux {Dispatch}
 * @returns {Function} Function of type Auth Action
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
 *  Function for register a new user in firestore
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 * @param {string} name  Name of the user
 * @Redux {Dispatch}
 * @returns {Function} Function of type Auth Action
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
 * Function for logout
 * @Redux {Dispatch}
 * @returns {Function} Two functions of type Auth Action
 */
export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(cleanEntriesWhenUserLogout());
  };
};

/**
 * Action for clean Redux store when the user has been log out
 * @Redux {Action}
 * @return {object} Type of the action
 */
export const logout = () => ({
  type: types.authLogout,
});

/**
 * Action for get the user data when has been logged
 * @param {string} uid Uid of the user
 * @param {string} displayName Name of the user
 * @param {string} photoURL Photo of the user
 * @Redux {Action}
 * @returns {object} Type and Payload
 */
export const authAction = (uid, displayName, photoURL = '') => ({
  type: types.authAction,
  payload: {
    uid,
    displayName,
    photoURL,
  },
});
