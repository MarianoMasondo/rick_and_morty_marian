import { ADD_FAV, LOGOUT, REMOVE_FAV, RESET_MY_FAVORITES } from "./types";

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

      case RESET_MY_FAVORITES:
      return {
        ...state,
        myFavorites: [],
        allCharacters: [],
        errors: false,
      };

    default:
      return { ...state };
  }
}


