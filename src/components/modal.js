import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect, useDispatch } from "react-redux";
import * as actionTypes from "../store/actionTypes/post";
import request from "../middlewares/axios/post";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

function FormDialog(props) {
  console.log(props.token);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState();
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    const newPost = new FormData();
    newPost.append("caption", caption);
    newPost.append("images", selectedFile);

    const response = await request("/posts/new", newPost, props.token);
    if (response.status === 200) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Post Created!",
          type: "success",
          open: true,
        },
      });
      props.setOpen(false);
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Try again later!",
          type: "error",
          open: true,
        },
      });
    }
  };

  const handleInputChange = async (event) => {
    setSelectedFile(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <form method="post" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Photo should not exceed more than 300 by 200 ratio.
            </DialogContentText>
            <input
              type="file"
              onChange={(event) => handleInputChange(event)}
              style={{ display: "block", marginBottom: "25px" }}
            />
            {imagePreview === undefined ? null : (
              <img
                src={imagePreview}
                height="40%"
                width="40%"
                style={{ position: "relative", left: "30%" }}
                alt="Preview"
              />
            )}
            <TextField
              autoFocus={false}
              margin="dense"
              type="text"
              fullWidth
              onChange={(event) => setCaption(event.target.value)}
              style={{ outline: "black" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Create Post</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newPostCreated: () =>
      dispatch({
        type: actionTypes.POST_CREATED,
      }),
    updatePost: (posts) =>
      dispatch({
        type: actionTypes.UPDATE_POST,
        posts: posts,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
