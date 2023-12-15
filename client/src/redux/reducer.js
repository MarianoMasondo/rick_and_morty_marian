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
      return {
        ...state,
        myFavorites: payload,
        allCharacters: payload,
        errors: false,
      };

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
  console.log("Reducer: Resetting favorites");
  const newState = {
    ...state,
    myFavorites: [],  // Asegúrate de que myFavorites se establezca en un array vacío.
    allCharacters: [],
    errors: false,
  };
  console.log("New State:", newState); // Agrega este log para verificar el nuevo estado
  return newState;

    default:
      return { ...state };
  }
}


