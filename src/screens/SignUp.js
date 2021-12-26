import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/screen/SignUp.css";
import request from "../middlewares/axios/post";
import { useDispatch } from "react-redux";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { useFormik } from "formik";

function SignUp(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      userName: "",
    },
    onSubmit: async (values) => {
      const response = await request("/user/register", values);
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Your account is created!",
            type: "success",
            open: true,
          },
        });
        props.history.push("/login");
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: `${response.data}`,
            type: "error",
            open: true,
          },
        });
      }
    },
  });

  return (
    <div className="register-div-parent-container">
      <div className="register">
        <div className="header">
          <img src="https://i.imgur.com/zqpwkLQ.png" alt="Instagram" />
          <h3>Sign up to see photos and videos from your friends</h3>
        </div>
        <div className="form-input">
          <form onSubmit={formik.handleSubmit}>
            <input
              placeholder="Email"
              name="email"
              value={formik.initialValues.email}
              onChange={formik.handleChange}
              type="email"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            ></input>
            <input
              placeholder="Full Name"
              name="name"
              value={formik.initialValues.name}
              onChange={formik.handleChange}
              type="string"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            ></input>
            <input
              name="userName"
              value={formik.initialValues.userName}
              onChange={formik.handleChange}
              placeholder="Username"
              type="string"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            ></input>
            <input
              name="password"
              value={formik.initialValues.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            ></input>
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className="route">
          <p>
            Have an Account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#0275d8" }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
