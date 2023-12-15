// reducer.js

import { ADD_FAV, LOGOUT, REMOVE_FAV, CLEAR_HOME, CLEAR_FAVORITES } from "./types";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  errors: false,
  isAuthenticated: true,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: payload,
        allCharacters: payload,
        errors: false,
      };

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: payload,
        allCharacters: payload,
        errors: false,
      };

    case "ERROR":
      return {
        ...state,
        errors: payload,
      };

    case LOGOUT:
      return {
        ...initialState,
        isAuthenticated: false,
      };

    case CLEAR_HOME:
      return {
        ...state,
        allCharacters: [],
      };

    case CLEAR_FAVORITES:
      return {
        ...state,
        myFavorites: [],
      };

    default:
      return { ...state };
  }
}


