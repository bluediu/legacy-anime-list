// @ts-check
import { types } from '../types/';

/**
 * Auth Reducer
 * @param {object} state State of the Reducer
 * @param {{type, payload}} action Type or Payload of the actions
 * @returns {object} New state
 */
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.authAction:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        photo: action.payload.photoURL,
      };

    case types.authLogout:
      return {};

    default:
      return state;
  }
};
