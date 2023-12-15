import { ADD_FAV, LOGOUT, REMOVE_FAV } from "./types";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  errors: false,
  isAuthenticated: true,
};

export default function reducer(state = initialState, { type, action }) {
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
        errors: false,
      };

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
        errors: false,
      };

    case "ERROR":
      return {
        ...state,
        errors: action.payload,
      };

      case LOGOUT:
        return {
          state,
          isAuthenticated: false,
        };
      

    default:
      return {...state};
  }
}
