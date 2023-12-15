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
        allCharacters: state.allCharacters.map((character) => ({
          ...character,
          isFavorite: false, 
        })),
        isAuthenticated: false,
      };

    default:
      return { ...state };
  }
}



