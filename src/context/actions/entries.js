// @ts-check
import Swal from 'sweetalert2';
import { db } from '../../services/firebase-config';
import { loadEntries } from '../../helpers/loadEntries';

import { types } from '../types/types';
import { showAlertOptions } from '../../helpers/showAlertOptions';

/* ----- GET SECTION ----- */

/**
 * Function for get data when the user has been logged from firestore
 * @param {string} uid
 * @Redux {Dispatch}
 * @return {Function }Two Functions of type Loading & Entries (Action)
 */
export const startGetEntriesWhenUserLogged = (uid) => {
  return async (dispatch) => {
    const entries = await loadEntries(uid);

    dispatch(startIsLoading(false));
    dispatch(setEntries(entries));
  };
};

/**
 * Function for get the user data
 * @param {object} entry Data of the entry
 * @Redux {Action}
 * @return {object} Type of the action
 */
export const setEntries = (entry) => ({
  type: types.entryLoad,
  payload: entry,
});

/* ----- CREATE SECTION ----- */

/**
 * Function for get data and put it in the store
 * @param {object} newEntry Data of a new entry
 * @Redux {Dispatch}
 * @returns {Function} Function of Type Action Entry
 */
export const startNewEntry = (newEntry) => {
  return async (dispatch, getState) => {
    // get the current id of the active user
    const uid = getState().auth.uid;

    // save in firestore
    const doc = await db
      .collection(`${uid}/animelist/entries`)
      .add(newEntry);

    dispatch(addNewEntry(doc.id, newEntry));

    Swal.fire(
      'Nuevo Anime',
      'Se agrego correctamente',
      'success'
    );
  };
};

/**
 * Action for create a new entry
 * @param {string} id Id of the User
 * @param {object} entry Data of the Entry
 * @Redux {Action}
 * @return {object} Type and Payload of the Entry Action
 */
export const addNewEntry = (id, entry) => ({
  type: types.entryAddNew,
  payload: {
    id,
    ...entry,
  },
});

/* ----- UPDATE SECTION ----- */

/**
 * Function for update the data from firebase and update it in the Store
 * @param {object} entry
 * @Redux {Dispatch}
 * @return {Function} Function of type Entry Action
 */
export const startUpdateEntry = (entry) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const updateEntryFirestore = { ...entry };
    delete updateEntryFirestore.id;

    Swal.fire({
      title: 'Actualizando',
      text: 'Espere por favor 🔨',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    // query for update from firebase
    await db
      .doc(`${uid}/animelist/entries/${entry.id}`)
      .update(updateEntryFirestore);

    dispatch(updateEntryById(entry.id, updateEntryFirestore));

    Swal.close();
  };
};

/**
 * Action for update an entry
 * @param {string} id Id of the user
 * @param {object} entry Data of the entry
 * @Redux {Action}
 * @returns {object} Type & Payload of the Entry
 */
export const updateEntryById = (id, entry) => ({
  type: types.entryUpdated,
  payload: {
    id,
    entry: {
      id,
      ...entry,
    },
  },
});

/* ----- DELETE SECTION ----- */

/**
 * Function for delete an entry by id
 * @param {string} id Id of the entry
 * @param {string} title Title of the entry
 * @Redux {Dispatch}
 * @returns {Function} Function of type Entry Action
 */
export const startDeleteEntry = (id, title) => {
  return async (dispatch, getState) => {
    // get the current id of the active user
    const uid = getState().auth.uid;

    const options = {
      title: '🗑️',
      text: `¿Quieres borrar "${title}"?`,
      icon: 'question',
    };

    const action = await showAlertOptions(options);

    if (action) {
      // save in firestore
      await db.doc(`${uid}/animelist/entries/${id}`).delete();

      dispatch(deleteEntryById(id));
    }
  };
};

/**
 * Action for delete an entry by id
 * @param {string} id Id of the entry
 * @Redux {Action}
 * @return {object} Type and Payload
 */
export const deleteEntryById = (id) => ({
  type: types.entryDelete,
  payload: id,
});

/* ----- ENTRIES ACTION SECTION ----- */

/**
 * Change the state to true or false
 * @param {boolean} state State
 * @Redux {Action}
 * @return {object} Type and Payload
 */
const startIsLoading = (state = true) => ({
  type: types.entryIsLoading,
  payload: state,
});

/**
 * Action for clean reducer when user logout
 * @Redux {Action}
 * @return {object} Type
 */
export const cleanEntriesWhenUserLogout = () => ({
  type: types.entryLogoutCleaning,
});

/**
 * Action for set the active entry in the store
 * @param {string} id Id of the entry
 * @param {object} entry Data of the entry
 * @return {object} Type & Payload
 */
export const activeEntry = (id, entry) => ({
  type: types.entryActive,
  payload: {
    id,
    ...entry,
  },
});
