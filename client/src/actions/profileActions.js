import axios from "axios";

import {
  GET_PROFILE,
  GET_CURRENT_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      })
    );
};

// Get profile by username
export const getProfileByUsername = username => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get(`/api/profile/handle/${username}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Allow users to edit profile
export const editProfile = (profileData, history, username) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push(`/profile/${username}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Follow user
export const followUser = username => dispatch => {
  axios
    .post(`/api/following/follow/${username}`)
    .then(res => dispatch(getProfileByUsername(username)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Follow user
export const unfollowUser = username => dispatch => {
  axios
    .post(`/api/following/unfollow/${username}`)
    .then(res => dispatch(getProfileByUsername(username)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
