import { types } from '../types/types';

const initialState = {
  entries: [],
  active: null,
  isLoading: true,
};

export const entriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.entryActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case types.entryAddNew:
      return {
        ...state,
        entries: [action.payload, ...state.entries],
      };

    case types.entryDelete:
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry.id !== action.payload
        ),
      };

    case types.entryUpdated:
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === action.payload.id
            ? action.payload.entry
            : entry
        ),
      };

    case types.entryLoad:
      return {
        ...state,
        entries: [...action.payload],
      };

    case types.entryIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    case types.entryLogoutCleaning:
      return {
        ...state,
        entries: [],
        active: null,
      };

    default:
      return state;
  }
};

export default entriesReducer;
