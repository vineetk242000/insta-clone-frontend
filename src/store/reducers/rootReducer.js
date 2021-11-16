import { combineReducers } from "redux";
import authReducer from "./auth";
import toastifyReducer from "./toastify";
import userReducer from "./user";
import postsReducer from "./post";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  postsReducer,
  toastifyReducer,
});

export default rootReducer;
