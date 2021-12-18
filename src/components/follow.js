import React, { useEffect, useState } from "react";
import "../styles/screen//Dashboard.css";
import { useDispatch, useSelector, connect } from "react-redux";
import * as actionTypes from "../store/actionTypes/user";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import request from "../middlewares/axios/get";

const FollowButton = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [follow, setFollow] = useState(props.follow);

  useEffect(() => {
    setFollow(props.follow);
  }, [props.follow]);

  const handleFollowUser = async (event) => {
    event.preventDefault();
    const response = await request(`/follow/${props.userIdToFollow}`, token);
    if (response.status === 200) {
      setFollow(true);
      props.incFollowingCount();
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Something went wrong!",
          type: "error",
          open: true,
        },
      });
    }
  };

  const handleUnfollowUser = async (event) => {
    event.preventDefault();
    const response = await request(`/unfollow/${props.userIdToFollow}`, token);
    if (response.status === 200) {
      setFollow(false);
      props.decFollowingCount();
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Something went wrong!",
          type: "error",
          open: true,
        },
      });
    }
  };

  if (follow) {
    return (
      <button
        type="submit"
        style={{
          color: "black",
          backgroundColor: "white",
          border: "0.5px solid grey",
          borderRadius: "3px",
          fontWeight: "400",
          outline: "none",
          padding: "5px",
        }}
        onClick={(event) => handleUnfollowUser(event)}
      >
        Unfollow
      </button>
    );
  }

  if (!follow) {
    return (
      <button
        type="submit"
        style={{
          backgroundColor: "#0095F6",
          color: "white",
          borderRadius: "3px",
          fontWeight: "400",
          outline: "none",
          border: "none",
          padding: "5px",
        }}
        onClick={(event) => handleFollowUser(event)}
      >
        Follow
      </button>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    incFollowingCount: () =>
      dispatch({
        type: actionTypes.INC_FOLLOWING_COUNT,
      }),

    decFollowingCount: () =>
      dispatch({
        type: actionTypes.DEC_FOLLOWING_COUNT,
      }),
  };
};

export default connect(null, mapDispatchToProps)(FollowButton);
