import Swal from 'sweetalert2';
import { db } from '../../services/firebase-config';
import { loadEntries } from '../../helpers/loadEntries';

import { types } from '../types/types';

/* ----- GET SECTION ----- */

/**
 * action for get data when the user has been logged from firestore
 * @param -> newNote: object
 * */
export const startGetEntriesWhenUserLogged = (uid) => {
  return async (dispatch) => {
    const entries = await loadEntries(uid);
    dispatch(startIsLoading(false));

    dispatch(setEntries(entries));
  };
};

/**
 * action for set data in the store
 * @param -> entry: object
 * */
export const setEntries = (entry) => ({
  type: types.entryLoad,
  payload: entry,
});

/* ----- CREATE SECTION ----- */

/**
 * action for get data and put it in the redux store
 * @param -> newNote: object
 * */
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

/***
  reducer action for add new entry
  @params -> id:number, entry: object  
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
 * action for update data from firebase and update it in the redux store
 * @param -> entry: object
 * */
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

/***
  reducer action for update an entry
  @params -> id:number, entry: object  
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
 * action for delete an entry data from firebase and remove it of the redux store
 * @param -> entry: object
 * */
export const startDeleteEntry = (id) => {
  return async (dispatch, getState) => {
    // get the current id of the active user
    const uid = getState().auth.uid;

    // save in firestore
    await db.doc(`${uid}/animelist/entries/${id}`).delete();

    dispatch(deleteEntryById(id));

    Swal.fire('🗑️', 'El anime se elimino', 'error');
  };
};

/***
  reducer action for update an entry
  @params -> id:number, entry: object  
*/
export const deleteEntryById = (id) => ({
  type: types.entryDelete,
  payload: id,
});

/* ----- ENTRIES ACTION SECTION ----- */

/**
 *
 * @param {*} state: boolean
 */
const startIsLoading = (state = true) => ({
  type: types.entryIsLoading,
  payload: state,
});

/*
  action for clean reducer when user logout
*/
export const cleanEntriesWhenUserLogout = () => ({
  type: types.entryLogoutCleaning,
});

/***
  reducer action for set the active entry in the store
  @params -> id:number, entry: object  
*/
export const activeEntry = (id, entry) => ({
  type: types.entryActive,
  payload: {
    id,
    ...entry,
  },
});
