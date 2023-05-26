import { ADD_FAV } from "./types"
import { REMOVE_FAV } from "./types"

const initialState = {
    myFavorites: [],
    allCharacters: [],
}

export default function reducer(
    state = initialState,
    {type, payload}
){
    switch(type){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.myFavorites, payload]
            }
            case REMOVE_FAV:
                const filteredFavs = state.myFavorites.filter(
                    fav => fav.id !== Number(payload)
                )
                return {
                    ...state,
                    myFavorites: filteredFavs
                }
                default:
                    return {...state}
    }
}