import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../styles/screen/Feed.css";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/UserSugestions";
import SinglePost from "../components/FeedPost";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { Container } from "@material-ui/core";

function Feed(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const { name, avatar, userName } = useSelector((state) => state.userReducer);

  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [feed, setFeed] = useState([]);
  const userId = props.userId;

  useEffect(() => {
    const getFeed = async () => {
      const response = await request("/user/feed", token);
      if (response.status === 200) {
        setFeed(response.data.posts);
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

    const getFollowSuggestions = async () => {
      const response = await request("/user/accounts", token);
      if (response.status === 200) {
        setSuggestedUsers(response.data.users);
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

    getFeed();

    getFollowSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="md" className="feed-section">
      <div className="posts">
        {feed.map((post) => (
          <SinglePost post={post} />
        ))}
      </div>
      <div className="feed-right-container">
        <div className="current-user-section">
          <Avatar
            style={{
              height: "50px",
              width: "50px",
              border: 0,
              objectFit: "cover",
            }}
            src={avatar === undefined ? null : avatar}
          />
          <div className="current-user-userName">
            <p style={{ fontWeight: "500" }}>{userName}</p>
            <p>{name}</p>
          </div>
          <a
            href="/login"
            style={{
              color: "grey",
              textDecoration: "none",
            }}
          >
            Logout
          </a>
        </div>

        <div className="follow-suggestions-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Suggestions for you</p>
            <p style={{ color: "#55B7F7" }}>See all</p>
          </div>
          {suggestedUsers.map((user) => (
            <div
              className="suggested-users-container"
              key={user._id.toString()}
            >
              <Avatar
                style={{
                  border: 0,
                  objectFit: "cover",
                }}
                src={user.avatar === undefined ? null : user.avatar}
                size={100}
              />
              <div className="current-user-userName">
                <Link
                  to={`/user/${user.userName}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p style={{ fontWeight: "500" }}>{user.userName}</p>
                </Link>
                <p>{user.name}</p>
              </div>
              <User userId={userId} userIdToFollow={user._id} follow={false} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Feed;
