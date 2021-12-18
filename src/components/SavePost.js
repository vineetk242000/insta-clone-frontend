import React, { useEffect, useState } from "react";
import { BookmarkIcon, FilledBookmarkIcon } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

const SavePost = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [savedState, setSaved] = useState(props.isSaved);

  useEffect(() => {
    setSaved(props.isSaved);
  }, [props.isSaved]);

  const handleToggleSave = async () => {
    if (savedState) {
      setSaved(false);
      const response = await request(`/unsavepost/${props.postId}`, token);
      if (response.status === 200) {
        props.unsavePost();
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
      setSaved(true);
      const response = await request(`/savepost/${props.postId}`, token);
      if (response.status === 200) {
        props.savePost();
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

  if (savedState) {
    return (
      <FilledBookmarkIcon
        onClick={handleToggleSave}
        style={{ margin: "5px 5px", height: "23px", width: "23px" }}
      />
    );
  }

  if (!savedState) {
    return (
      <BookmarkIcon
        onClick={handleToggleSave}
        style={{ margin: "5px 5px", height: "23px", width: "23px" }}
      />
    );
  }
};

export default SavePost;
