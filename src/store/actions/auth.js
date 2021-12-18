import { LOGIN_USER, LOGOUT_USER } from "../actionTypes/user";
import { AUTH_FAILED, AUTH_SUCCESS } from "../actionTypes/auth";
import request from "../../middlewares/axios/get";
import { ADD_POSTS } from "../actionTypes/post";

export const loginUser = (token) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_SUCCESS,
      payload: token,
    });
    const response = await request(`/user/me`, token);
    localStorage.setItem("token", token);
    if (response.status === 200) {
      dispatch({
        type: LOGIN_USER,
        payload: response.data.userData,
      });
      dispatch({
        type: ADD_POSTS,
        payload: response.data.userData.posts,
      });
    } else {
      dispatch({
        type: AUTH_FAILED,
        error: true,
      });
    }
  };
};
