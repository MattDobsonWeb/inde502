import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  UPDATE_LIKES,
  GET_MOVIE_POSTS,
  GET_PROFILE_POSTS
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  posted: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_MOVIE_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_PROFILE_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(posts => {
          if (posts._id === action.payload._id) {
            return { ...posts, ...action.payload };
          }
          return posts;
        })
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        posted: true
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
