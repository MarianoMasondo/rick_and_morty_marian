import { ADD_FAV, LOGOUT, REMOVE_FAV } from "./types";

export const addFav = (character) => {
  return {
    type: ADD_FAV,
    payload: character,
  };
};

export const removeFav = (id) => {
  return {
    type: REMOVE_FAV,
    payload: id,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};