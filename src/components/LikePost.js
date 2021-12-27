import React, { useEffect, useState } from "react";
import { HeartIcon, FilledHeartIcon } from "./Icons";
import { useDispatch, useSelector, connect } from "react-redux";
import putRequest from "../middlewares/axios/put";
import deleteRequest from "../middlewares/axios/delete";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

const LikePost = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const userName = useSelector((state) => state.userReducer.userName);
  const [likedState, setLikedState] = useState(false);

  useEffect(() => {
    props.likes.forEach((user) => {
      if (user.userName === userName) {
        setLikedState(true);
      }
    });
  }, [userName]);

  const handleToggleLike = async () => {
    if (likedState) {
      setLikedState(false);
      const response = await deleteRequest(
        `/posts/${props.postId}/like`,
        token
      );
      if (response.status === 200) {
        props.decLikes();
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
    } else {
      setLikedState(true);
      const response = await putRequest(
        `/posts/${props.postId}/like`,
        {},
        token
      );
      if (response.status === 200) {
        props.incLikes();
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
    }
  };

  if (likedState) {
    return (
      <FilledHeartIcon
        onClick={handleToggleLike}
        style={{ margin: "5px 5px 5px 0", width: "24px", height: "24px" }}
      />
    );
  }

  if (!likedState) {
    return (
      <HeartIcon
        onClick={handleToggleLike}
        style={{ margin: "5px 5px 5px 0", width: "24px", height: "24px" }}
      />
    );
  }
};

export default LikePost;
