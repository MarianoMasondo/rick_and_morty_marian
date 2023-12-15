// actions.js

import { ADD_FAV, LOGOUT, REMOVE_FAV, CLEAR_HOME, CLEAR_FAVORITES } from "./types";
import axios from "axios";
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

export const clearHome = () => ({
  type: CLEAR_HOME,
});

export const clearFavorites = () => ({
  type: CLEAR_FAVORITES,
});

export const logout = () => {
  return {
    type: LOGOUT,
  };
};



