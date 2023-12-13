// Actions.js
import axios from "axios";
const ENDPOINT = "/rickandmorty/fav";

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

