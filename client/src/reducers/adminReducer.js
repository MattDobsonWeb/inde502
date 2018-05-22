import { ADMIN_GET_POSTS, ADMIN_GET_USER_POSTS } from "../actions/types";

const initialState = {
  posts: [],
  userPosts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADMIN_GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADMIN_GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
