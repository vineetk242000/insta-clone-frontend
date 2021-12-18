import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/screen/SignUp.css";
import request from "../middlewares/axios/post";
import { useDispatch } from "react-redux";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

function SignUp(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUserName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      name: name,
      email: email,
      password: pass,
      userName: userName,
    };
    const response = await request("/user/register", user);
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
  }

  return (
    <div className="register-div-parent-container">
      <div className="register">
        <div className="header">
          <img src="https://i.imgur.com/zqpwkLQ.png" alt="Instagram" />
          <h3>Sign up to see photos and videos from your friends</h3>
        </div>
        <div className="form-input">
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              placeholder="Email"
              type="email"
              spellCheck="false"
              autoCapitalize="off"
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="off"
            ></input>
            <input
              placeholder="Full Name"
              type="string"
              spellCheck="false"
              autoCapitalize="off"
              onChange={(event) => setName(event.target.value)}
              autoComplete="off"
            ></input>
            <input
              placeholder="Username"
              type="string"
              spellCheck="false"
              autoCapitalize="off"
              onChange={(event) => setUserName(event.target.value)}
              autoComplete="off"
            ></input>
            <input
              placeholder="Password"
              type="password"
              spellCheck="false"
              autoCapitalize="off"
              onChange={(event) => setPass(event.target.value)}
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