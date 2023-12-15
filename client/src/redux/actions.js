// actions.js

import axios from "axios";
import {
  ADD_FAV,
  LOGOUT,
  REMOVE_FAV,
  RESET_MY_FAVORITES,
} from "./types";

const ENDPOINT = "/rickandmorty/fav";

export const addFav = (character) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(ENDPOINT, character);
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
};

export const removeFav = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${ENDPOINT}/${id}`);
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
};

export const logout = () => {
  // Limpiar localStorage
  localStorage.removeItem('myFavorites');

  // Reiniciar los favoritos en el estado
  return {
    type: LOGOUT,
  };
};

export const resetMyFavorites = () => {
  console.log("Resetting favorites");
  return {
    type: RESET_MY_FAVORITES,
  };
};




