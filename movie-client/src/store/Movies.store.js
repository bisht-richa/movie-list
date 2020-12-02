import { createContext } from 'react'

export const initialState = {
    loading: true,
    errorMessage: null,
    movies: []
  };
  
  export const moviesReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          movies: action.payload
        };
      case "SEARCH_MOVIES_FAIL":
        return {
          ...state,
          loading: false,
          errorMessage: action.payload
        };
        case "UPDATE_MOVIES_SUCCESS":
          return {
            ...state,
            loading: false,
            movies: action.payload
          };
      default:
        return state;
    }
  };

  export const MoviesStore = createContext(null)
