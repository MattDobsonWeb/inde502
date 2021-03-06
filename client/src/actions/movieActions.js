import axios from "axios";

import {
  GET_MOVIE_DATA,
  MOVIE_DATA_LOADING,
  GET_ERRORS,
  GET_FEATURED_MOVIES
} from "./types";

// Get Movie Data
export const getMovieData = (media, movie_id) => dispatch => {
  dispatch(setMovieDataLoading());

  axios
    .get(`/api/movies/info/${media}/${movie_id}`)
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

// Get Movie Data
export const getFeaturedMovies = () => dispatch => {
  dispatch(setMovieDataLoading());

  axios
    .get(`/api/movies/featured`)
    .then(res =>
      dispatch({
        type: GET_FEATURED_MOVIES,
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

//Set Loading State
export const setPostLoading = () => {
  return {
    type: MOVIE_DATA_LOADING
  };
};

//Set Loading State
export const setMovieDataLoading = () => {
  return {
    type: MOVIE_DATA_LOADING
  };
};
