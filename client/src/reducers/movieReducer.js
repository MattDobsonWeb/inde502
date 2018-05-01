import {
  GET_MOVIE_DATA,
  GET_MOVIE_POSTS,
  POST_LOADING,
  MOVIE_DATA_LOADING
} from "../actions/types";

const initialState = {
  moviePosts: [],
  movieData: {},
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
    case GET_MOVIE_POSTS:
      return {
        ...state,
        moviePosts: action.payload
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
