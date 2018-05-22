import axios from "axios";

import { ADMIN_GET_POSTS, ADMIN_GET_USER_POSTS } from "./types";

// Get Movie Data
export const getAdminPosts = hours => dispatch => {
  axios
    .get(`/api/admin/posts/hours/${hours}`)
    .then(res =>
      dispatch({
        type: ADMIN_GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ADMIN_GET_POSTS,
        payload: null
      })
    );
};

// Get Users Posts
export const getAdminUserPosts = username => dispatch => {
  axios
    .get(`/api/posts/user/${username}`)
    .then(res =>
      dispatch({
        type: ADMIN_GET_USER_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ADMIN_GET_USER_POSTS,
        payload: null
      })
    );
};
