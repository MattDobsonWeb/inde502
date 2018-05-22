import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import movieReducer from "./movieReducer";
import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";
import adminReducer from "./adminReducer";

// Combine all reducers
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer,
  movie: movieReducer,
  profile: profileReducer,
  notification: notificationReducer,
  admin: adminReducer
});
