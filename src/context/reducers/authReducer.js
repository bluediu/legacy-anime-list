import { types } from '../types/types';

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
