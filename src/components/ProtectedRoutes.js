import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.authReducer.error);
  const token = localStorage.getItem("token");
  if (token === null || token === undefined || error) {
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        open: true,
        msg: "Session Expired!",
        type: "info",
      },
    });
    return <Redirect to="/login" />;
  } else {
    return <Route path={props.path} exact component={props.component} />;
  }
};

export default withRouter(ProtectedRoute);
