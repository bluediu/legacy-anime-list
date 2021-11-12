// @ts-check
import { types } from '../types/types';

const initialState = {
  /** @type {Array<object>} */
  entries: [],
  /** @type {object | null} */
  active: null,
  /** @type {boolean} */
  isLoading: true,
};

/**
 * Entries Reducer
 * @param {object} state State of the Reducer
 * @param {{type, payload}} action Type or Payload of the actions
 * @returns {object} New state
 */
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
