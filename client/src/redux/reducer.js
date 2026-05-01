import { ADD_FAV, LOGOUT, REMOVE_FAV } from "./types";

const initialState = {
  myFavorites: JSON.parse(localStorage.getItem("myFavorites")) || [],
  allCharacters: JSON.parse(localStorage.getItem("myFavorites")) || [],
  errors: false,
  isAuthenticated: true,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FAV: {
      const alreadyExists = state.myFavorites.some(
        (character) => character.id === payload.id
      );

      if (alreadyExists) {
        return state;
      }

      const updatedFavorites = [...state.myFavorites, payload];

      localStorage.setItem("myFavorites", JSON.stringify(updatedFavorites));

      return {
        ...state,
        myFavorites: updatedFavorites,
        allCharacters: updatedFavorites,
        errors: false,
      };
    }

    case REMOVE_FAV: {
      const updatedFavorites = state.myFavorites.filter(
        (character) => character.id !== payload
      );

      localStorage.setItem("myFavorites", JSON.stringify(updatedFavorites));

      return {
        ...state,
        myFavorites: updatedFavorites,
        allCharacters: updatedFavorites,
        errors: false,
      };
    }

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