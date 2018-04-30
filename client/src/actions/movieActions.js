import axios from "axios";

import {
  GET_MOVIE_DATA,
  GET_MOVIE_POSTS,
  POST_LOADING,
  GET_ERRORS
} from "./types";

// Get Movie Data
export const getMovieData = movie_id => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/movies/info/${movie_id}`)
    .then(res =>
      dispatch({
        type: GET_MOVIE_DATA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Movie Posts
export const getMoviePosts = movie_id => dispatch => {
  dispatch(setPostLoading());
  console.log(movie_id);
  axios
    .get(`/api/movies/${movie_id}`)
    .then(res =>
      dispatch({
        type: GET_MOVIE_POSTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

//Set Loading State
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
