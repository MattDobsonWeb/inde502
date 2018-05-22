import {
  GET_MOVIE_DATA,
  POST_LOADING,
  MOVIE_DATA_LOADING,
  GET_FEATURED_MOVIES
} from "../actions/types";

const initialState = {
  movieData: {},
  featuredMovies: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVIE_DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FEATURED_MOVIES:
      return {
        ...state,
        featuredMovies: action.payload,
        loading: false
      };
    case GET_MOVIE_DATA:
      return {
        ...state,
        movieData: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
