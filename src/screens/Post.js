import React, { useState, useEffect } from "react";
import "../styles/screen/Post.css";
import Avatar from "@material-ui/core/Avatar";
import { CommentIcon, InboxIcon, MoreIcon } from "../components/Icons";
import { connect, useDispatch, useSelector } from "react-redux";
import Like from "../components/LikePost";
import Save from "../components/SavePost";
import { Link, useParams } from "react-router-dom";
import DeletePost from "../components/DeletePost";
import request from "../middlewares/axios/post";
import getRequest from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { Container } from "@material-ui/core";

const Post = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector((state) => state.authReducer.token);
  const [loading, setloading] = useState(true);
  const [post, setpost] = useState();
  const [likes, setLikes] = useState();
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const response = await getRequest(`/user/post/${id}`, token);
      if (response.status === 200) {
        setLikes(response.data.post.likes.length);
        setpost(response.data.post);
        setloading(false);
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            msg: "Failed to fetch the post",
            open: true,
          },
        });
      }
    };

    getPost();
  }, []);

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (comment != null) {
      const addComment = {
        comment: comment,
        postId: post._id.toString(),
      };

      const response = await request("/comment", addComment, token);
      if (response.status === 200) {
        setComment("");
        const addedComment = response.data.comment;
        setNewComment((newComment) => [...newComment, addedComment]);
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Comment added!",
            type: "success",
            open: true,
          },
        });
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
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Comment can not be empty!",
          type: "info",
          open: true,
        },
      });
    }
  };

  const incLikes = () => {
    setLikes(likes + 1);
    post.likesCount = post.likesCount + 1;
    post.isLiked = true;
  };

  const decLikes = () => {
    setLikes(likes - 1);
    post.likesCount = post.likesCount - 1;
    post.isLiked = false;
  };

  const savePost = () => {
    post.isSaved = true;
  };

  const unsavePost = () => {
    post.isSaved = false;
  };

  return (
    <Container maxWidth="md">
      {loading ? null : (
        <div className="single-post-container">
          <DeletePost
            open={open}
            setOpen={setOpen}
            userId={post.user._id}
            postId={post._id}
          />
          <div className="left-image-container">
            <img src={post.images[0]} alt="post" />
          </div>
          <div className="single-post-details-container">
            <div className="post-posted-by-user">
              <Avatar
                style={{
                  height: "30px",
                  width: "30px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  border: 0,
                  objectFit: "cover",
                }}
                src={post.user.avatar === undefined ? null : post.user.avatar}
                size={100}
              />
              <Link
                to={{
                  pathname: "/user/dashboard",
                  state: { userId: post.user._id.toString() },
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p style={{ fontWeight: "500" }}>{post.user.userName}</p>
              </Link>
              {post.isMine !== undefined && post.isMine === true ? (
                <div
                  onClick={(event) => setOpen(true)}
                  style={{
                    display: "inline-block",
                    position: "relative",
                    left: "60%",
                  }}
                >
                  <MoreIcon
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  />
                </div>
              ) : null}
            </div>
            <div className="post-caption">
              <Avatar
                style={{
                  height: "30px",
                  width: "30px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  border: 0,
                  objectFit: "cover",
                }}
                src={post.user.avatar === undefined ? null : post.user.avatar}
                size={100}
              />
              <p style={{ fontWeight: "500" }}>{post.user.userName}</p>
              <p>{post.caption}</p>
            </div>
            <div className="comments-container">
              {post.comments.map((comment) => (
                <div className="user-comment">
                  <div className="user-comment-left">
                    <Avatar
                      style={{
                        height: "30px",
                        width: "30px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        border: 0,
                        objectFit: "cover",
                      }}
                      src={
                        comment.user.avatar === undefined
                          ? null
                          : comment.user.avatar.length
                      }
                      size={100}
                    />
                  </div>
                  <div className="user-comment-right">
                    <p style={{ fontWeight: "500" }}>{comment.user.userName}</p>
                    <p style={{ marginLeft: "7px" }}>{comment.text}</p>
                  </div>
                </div>
              ))}
              {newComment.map((comment) => (
                <div className="user-comment">
                  <div className="user-comment-left">
                    <Avatar
                      style={{
                        height: "30px",
                        width: "30px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        border: 0,
                        objectFit: "cover",
                      }}
                      src={
                        comment.user.avatar === undefined
                          ? null
                          : comment.user.avatar
                      }
                      size={100}
                    />
                  </div>
                  <div className="user-comment-right">
                    <p style={{ fontWeight: "500" }}>{comment.user.userName}</p>
                    <p style={{ marginLeft: "7px" }}>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="single-post-action-container">
              <Like
                isLiked={post.isLiked}
                postId={post._id.toString()}
                incLikes={incLikes}
                decLikes={decLikes}
              />
              <CommentIcon style={{ margin: "5px 5px" }} />
              <InboxIcon style={{ margin: "5px 5px" }} />
              <div
                style={{
                  position: "relative",
                  left: "55%",
                  display: "inline-block",
                }}
              >
                <Save
                  isSaved={post.isSaved}
                  postId={post._id.toString()}
                  savePost={savePost}
                  unsavePost={unsavePost}
                />
              </div>
              <p
                style={{ fontWeight: "500", fontSize: "15px", lineHeight: "0" }}
              >
                {likes} likes
              </p>
            </div>
            <div className="new-comment-container">
              <form onSubmit={(event) => handleAddComment(event)}>
                <input
                  type="string"
                  placeholder="Add a Comment.."
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                ></input>
                <button type="submit">Post</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Post;
