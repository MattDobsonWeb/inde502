import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import movieReducer from "./movieReducer";

// Combine all reducers
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer,
  movie: movieReducer
});
