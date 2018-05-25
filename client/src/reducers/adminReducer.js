import {
  ADMIN_GET_POSTS,
  ADMIN_GET_USER_POSTS,
  ADMIN_GET_AI
} from "../actions/types";

const initialState = {
  posts: [],
  userPosts: [],
  ai: {},
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
    case ADMIN_GET_AI:
      return {
        ...state,
        ai: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
