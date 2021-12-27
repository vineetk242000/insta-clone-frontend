import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../store/actionTypes/post";
import { withRouter } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" in="true" ref={ref} {...props} />;
});

function DeletePost(props) {
  const { open, setOpen, userId, postId } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const refreshDashoard = async () => {
    await axios
      .get(`http://localhost:3001/getPosts/${userId}`)
      .then((response) => {
        console.log(response);
        props.updatePost(response.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePost = async () => {
    await axios
      .get(`http://localhost:3001/deletePost/${postId}/${userId}`)
      .then(function (response) {
        console.log(response);
        props.deletePost();
        refreshDashoard();
        setOpen(false);
        props.history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      TransitionComponent={Transition}
      maxWidth="lg"
      style={{ padding: "0 100px" }}
    >
      <DialogTitle id="simple-dialog-title">
        <center>Action</center>
      </DialogTitle>
      <DialogContent>
        <center>
          <List>
            <ListItem button onClick={() => handleDeletePost()}>
              <span
                style={{ fontSize: "16px", fontWeight: "500", color: "red" }}
              >
                Delete Post
              </span>
            </ListItem>
            <ListItem button onClick={() => handleClose()}>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "grey",
                  paddingLeft: "10px",
                }}
              >
                Cancel
              </span>
            </ListItem>
          </List>
        </center>
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = () => (dispatch) => {
  return {
    deletePost: () =>
      dispatch({
        type: actionTypes.POST_DELETED,
      }),
    updatePost: (posts) =>
      dispatch({
        type: actionTypes.UPDATE_POST,
        posts: posts,
      }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(DeletePost));
