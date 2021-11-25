import { LOGIN_USER, LOGOUT_USER } from "../actionTypes/user";
import { AUTH_FAILED, AUTH_SUCCESS } from "../actionTypes/auth";
import request from "../../axios/get";

export const loginUser = (token) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_SUCCESS,
      token: token,
    });
    const response = await request(`/user/me`, token);
    localStorage.setItem("token", token);
    if (response.status === 200) {
      dispatch({
        type: LOGIN_USER,
        payload: response.data.userData,
      });
    } else {
      dispatch({
        type: AUTH_FAILED,
        error: true,
      });
    }
  };
};
