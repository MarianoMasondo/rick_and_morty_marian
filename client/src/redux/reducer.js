const initialState = {
  myFavorites: [],
  allCharacters: [],
  errors: false,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "ADD_FAV":
      return {
        ...state,
        myFavorites: [...state.myFavorites, payload],
        errors: false,
      };

    case "REMOVE_FAV":
      return {
        ...state,
        myFavorites: state.myFavorites.filter((fav) => fav.id !== payload),
        errors: false,
      };

    case "ERROR":
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
}

