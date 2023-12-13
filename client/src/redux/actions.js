// Actions.js
import axios from "axios";

const ENDPOINT = "/rickandmorty/fav";

export const addFav = (character) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(ENDPOINT, character);
      return dispatch({
        type: "ADD_FAV",
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
      // Now make a request to remove the character from the server
      await axios.delete(`${ENDPOINT}/${id}`);

      // Remove character from the favorites list after successful deletion on the server
      dispatch({
        type: "REMOVE_FAV",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
};


