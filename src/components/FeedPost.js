import React, { useState } from "react";
import LikePost from "./LikePost";
import SavePost from "./SavePost";
import { CommentIcon, InboxIcon } from "./Icons";
import "../styles/screen/Feed.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import request from "../middlewares/axios/post";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

const FeedPost = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const post = props.post;
  const [comment, setComment] = useState("");
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [newComment, setNewComment] = useState([]);

  const incLikes = () => {
    setLikesCount(likesCount + 1);
    post.likesCount = post.likesCount + 1;
    post.isLiked = true;
  };

  const decLikes = () => {
    setLikesCount(likesCount - 1);
    post.likesCount = post.likesCount - 1;
    post.isLiked = false;
  };

  const savePost = () => {
    post.isSaved = true;
  };

  const unsavePost = () => {
    post.isSaved = false;
  };

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

  return (
    <div className="post" key={post._id.toString()}>
      <div className="post-owner-section">
        <img
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            height: "30px",
            width: "30px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={
            post.user.avatar === undefined
              ? require("./default_avatar.jpg")
              : post.user.avatar
          }
          size={100}
          alt="avatar"
        />
        <Link
          to={`/user/${post.user.userName}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <p style={{ fontWeight: "500" }}>{post.user.userName}</p>
        </Link>
      </div>
      <img src={post.images[0]} alt="Post"></img>
      <div className="post-details-container">
        <div className="post-action-container">
          <LikePost
            likes={post.likes}
            postId={post._id}
            incLikes={incLikes}
            decLikes={decLikes}
          />
          <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
            {" "}
            <CommentIcon style={{ margin: "5px 5px" }} />
          </Link>
          <InboxIcon style={{ margin: "5px 5px" }} />
          <div
            style={{
              display: "inline-block",
              position: "relative",
              left: "78%",
            }}
          >
            <SavePost
              isSaved={post.isSaved}
              savePost={savePost}
              unsavePost={unsavePost}
              postId={post._id}
            />
          </div>
          <p style={{ fontWeight: "500", fontSize: "15px" }}>
            {likesCount} likes
          </p>
        </div>
        <div className="user-post-caption">
          <p>
            <span
              style={{
                fontWeight: "500",
                marginRight: "3px",
                fontSize: "15px",
              }}
            >
              {post.user.userName}
            </span>
            {post.caption}
          </p>
        </div>
        <div className="post-comment-section"></div>
        <Link
          to={`/post/${post._id}`}
          style={{ textDecoration: "none", color: "grey" }}
        >
          View all {post.commentsCount} comments
        </Link>
        {post.comments?.slice(0, 2).map((comment) => (
          <p className="highlighted-comment" key={comment._id.toString()}>
            <span
              style={{
                fontWeight: "500",
                marginRight: "3px",
                fontSize: "15px",
              }}
            >
              {comment.user.userName}
            </span>
            {comment.text}
          </p>
        ))}
        {newComment?.map((comment) => (
          <p className="highlighted-comment" key={comment._id.toString()}>
            <span
              style={{
                fontWeight: "500",
                marginRight: "3px",
                fontSize: "15px",
              }}
            >
              {comment.user.userName}
            </span>
            {comment.text}
          </p>
        ))}
        <p style={{ fontSize: "12px", color: "grey" }}>
          {post.createdAt.toString()}
        </p>
      </div>
      <div
        style={{
          backgroundColor: "rgb(235, 232, 232)",
          width: "100%",
          height: "0.5px",
        }}
      ></div>
      <form onSubmit={(event) => handleAddComment(post._id, event)}>
        <input
          type="string"
          placeholder="Add a Comment.."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></input>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userName: state.userName,
    avatar: state.avatar,
  };
};

export default connect(mapStateToProps)(FeedPost);
