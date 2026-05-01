import { ADD_FAV, LOGOUT, REMOVE_FAV } from "./types";

const initialState = {
  myFavorites: JSON.parse(localStorage.getItem("myFavorites")) || [],
  allCharacters: JSON.parse(localStorage.getItem("myFavorites")) || [],
  errors: false,
  isAuthenticated: true,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FAV:
    case REMOVE_FAV:
      localStorage.setItem("myFavorites", JSON.stringify(payload));

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
      localStorage.removeItem("myFavorites");

      return {
        ...state,
        myFavorites: [],
        allCharacters: [],
        errors: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
