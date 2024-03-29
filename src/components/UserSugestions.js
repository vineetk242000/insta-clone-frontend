import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/screen/Feed.css";
import { connect } from "react-redux";
import * as actionTypes from "../store/actionTypes/user";

const UserSuggestion = (props) => {
  const [follow, setFollow] = useState(props.follow);

  useEffect(() => {
    setFollow(props.follow);
  }, [props.follow]);

  const followUser = async (event) => {
    event.preventDefault();
    await axios
      .get(
        `http://localhost:3001/follow/${
          props.userId
        }/${props.userIdToFollow.toString()}`
      )
      .then(function (response) {
        console.log(response);
        setFollow(true);
        props.incFollowingCount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (follow) {
    return (
      <button
        style={{
          color: "grey",
        }}
        type="button"
      >
        Followed
      </button>
    );
  }

  if (!follow) {
    return (
      <button type="submit" onClick={(event) => followUser(event)}>
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
  };
};

export default connect(null, mapDispatchToProps)(UserSuggestion);
