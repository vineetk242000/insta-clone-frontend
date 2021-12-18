import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../styles/screen/Dashboard.css";
import { PostIcon, BookmarkIcon, NewPostIcon } from "../components/Icons";
import { connect, useDispatch, useSelector } from "react-redux";
import Modal from "../components/modal";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

function Dashboard(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [open, setOpen] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const [showSavedPosts, setShowSavedPosts] = useState(false);

  useEffect(() => {
    const getSavedPosts = async () => {
      const response = await request("/savedPosts", token);
      if (response.status === 200) {
        setSavedPosts(response.data.posts);
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

    getSavedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Modal open={open} setOpen={setOpen} />
      <div className="dashboard-container">
        <div className="top">
          <div style={{ display: "inline-block", width: "250px" }}>
            <Avatar
              style={{
                height: "175px",
                width: "175px",
                verticalAlign: "middle",
              }}
              src={
                props.avatar === undefined
                  ? null
                  : `http://localhost:3001/image/${props.avatar.slice(
                      58,
                      props.avatar.length
                    )}`
              }
            />
          </div>
          <div
            style={{
              display: "inline-block",
              width: "500px",
              verticalAlign: "top",
            }}
          >
            <div className="userName">
              <p>{props.userName}</p>
              <span>
                <Link to="/user/edit">
                  <button>Edit Profile</button>
                </Link>
              </span>
            </div>
            <div className="count">
              <p>
                <span className="bold">{props.postCount}</span> posts
              </p>
              <p>
                <Link
                  to="/user/followers"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span className="bold">{props.followersCount}</span> followers
                </Link>
              </p>
              <p>
                <Link
                  to="/user/following"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span className="bold">{props.followingCount}</span> following
                </Link>
              </p>
            </div>
            <p>
              <span className="user-name">{props.name}</span>
            </p>
            <a
              href={props.website}
              style={{
                margin: "0",
                padding: "0",
                textDecoration: "none",
                color: "#00376B",
              }}
            >
              <span className="user-name">{props.website}</span>
            </a>
            <p>
              <span className="user-name">{props.bio}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="posts-section">
        <div
          className="posts-section-header"
          onClick={(event) => setShowSavedPosts(false)}
          style={showSavedPosts ? { color: "grey" } : { color: "black" }}
        >
          <PostIcon />
          <p className="posts-section-title">POSTS</p>
        </div>
        <div
          className="posts-section-header"
          onClick={(event) => setShowSavedPosts(true)}
          style={showSavedPosts ? { color: "black" } : { color: "grey" }}
        >
          <BookmarkIcon style={{ height: "13px" }} />
          <p className="posts-section-title">SAVED</p>
        </div>
        <div
          className="posts-section-header"
          onClick={handleClick}
          style={{ color: "grey" }}
        >
          <NewPostIcon style={{ height: "13px" }} />
          <p className="posts-section-title">NEW POST</p>
        </div>
      </div>
      <div className="my-posts-container">
        {showSavedPosts
          ? savedPosts.map((post) => (
              <Link
                to={{ pathname: "/feed/post", state: { post: post } }}
                style={{ textDecoration: "none" }}
                key={post._id}
              >
                <img
                  src={`http://localhost:3001/image/${post.imageUrl.slice(
                    58,
                    post.imageUrl.length
                  )}`}
                  alt="post"
                />
              </Link>
            ))
          : props.posts.map(
              (post) => (
                // eslint-disable-next-line
                (post.isMine = true),
                (
                  <Link
                    to={{ pathname: "/feed/post", state: { post: post } }}
                    style={{ textDecoration: "none" }}
                    key={post._id}
                  >
                    <img src={post.images[0]} alt="post" />
                  </Link>
                )
              )
            )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    followersCount: state.userReducer.followersCount,
    followingCount: state.userReducer.followingCount,
    userName: state.userReducer.userName,
    name: state.userReducer.name,
    bio: state.userReducer.bio,
    website: state.userReducer.website,
    posts: state.postsReducer.posts,
    avatar: state.userReducer.avatar,
    postCount: state.postsReducer.postCount,
  };
};

export default connect(mapStateToProps)(Dashboard);