import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./LogIn.css";
import { useDispatch } from "react-redux";
import request from "../../middlewares/axios/post";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";
import { loginUser } from "../../store/actions/auth";

function LogIn(props) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      userName: userName,
      pass: pass,
    };
    const response = await request("/user/login", user);
    if (response.status === 200) {
      dispatch(loginUser(response.data.token));
      props.history.push("/user");
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "You are now logged in",
          type: "success",
          open: true,
        },
      });
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
  }

  return (
    <div className="login-div-parent-container">
      <div className="login">
        <div className="header">
          <img src="https://i.imgur.com/zqpwkLQ.png" alt="Instagram" />
        </div>
        <div className="form-input">
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              placeholder="Username"
              type="string"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              onChange={(event) => setUserName(event.target.value)}
            ></input>
            <input
              placeholder="Password"
              type="password"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              onChange={(event) => setPass(event.target.value)}
            ></input>
            <button type="submit">Log in</button>
          </form>
        </div>
        <div className="route">
          <p>
            Don't have an account?{" "}
            <Link to="/" style={{ textDecoration: "none", color: "#0275d8" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LogIn);
