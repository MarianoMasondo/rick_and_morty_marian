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
      dispatch({
        type: ADD_FAV,
        payload: data,
      });
      localStorage.setItem('myFavorites', JSON.stringify(data));
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
      dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
      localStorage.setItem('myFavorites', JSON.stringify(data));
    } catch (error) {
      return dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
};

export const logout = () => {
  localStorage.removeItem('myFavorites');

  return {
    type: LOGOUT,
  };
};

export const resetMyFavorites = () => {
  localStorage.removeItem('myFavorites');
  return {
    type: RESET_MY_FAVORITES,
  };
};



