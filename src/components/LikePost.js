import React, { useEffect, useState } from "react";
import { HeartIcon, FilledHeartIcon } from "./Icons";
import { useDispatch, useSelector, connect } from "react-redux";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

const LikePost = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [likedState, setLiked] = useState(props.isLiked);

  useEffect(() => {
    setLiked(props.isLiked);
  }, [props.isLiked]);

  const handleToggleLike = async () => {
    if (likedState) {
      setLiked(false);
      const response = await request(`/unlikePost/${props.postId}`, token);
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
      setLiked(true);
      const response = await request(`/likePost/${props.postId}`, token);
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

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(LikePost);
