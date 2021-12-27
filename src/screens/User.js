import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../styles/screen/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import FollowButton from "../components/FollowButton";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { Container } from "@material-ui/core";

function UserDashboard(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const { userName } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await request(`/user/search/${userName}`, token);
      if (response.status === 200) {
        console.log(response.data);
        setUserData(response.data.userData);
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Could not get the User Details!",
            type: "error",
            open: true,
          },
        });
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {userData === null ? (
        <div />
      ) : (
        <Container maxWidth="md">
          <div className="user-section">
            <Avatar
              style={{
                height: "175px",
                width: "175px",
              }}
              src={userData.avatar === undefined ? null : userData.avatar}
            />
            <div style={{ width: "50%" }}>
              <div className="userName">
                <p>{userData.userName}</p>
                <span>
                  <FollowButton
                    follow={userData.isFollowed}
                    userId={userData._id}
                    userName={userData.userName}
                  />
                </span>
              </div>
              <div className="count">
                <p>
                  <span className="bold">{userData.posts.length}</span> posts
                </p>
                <p>
                  <Link
                    to="/user/followers"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span className="bold">{userData.followers.length}</span>{" "}
                    followers
                  </Link>
                </p>
                <p>
                  <Link
                    to="/user/following"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span className="bold">{userData.following.length}</span>{" "}
                    following
                  </Link>
                </p>
              </div>
              <p>
                <span className="user-name">{userData.name}</span>
              </p>
              <a
                href={userData.website}
                style={{
                  margin: "0",
                  padding: "0",
                  textDecoration: "none",
                  color: "#00376B",
                }}
              >
                <span className="user-name">{userData.website}</span>
              </a>
              <p>
                <span className="user-name">{userData.bio}</span>
              </p>
            </div>
          </div>
          <div className="posts-section"></div>
          <div className="my-posts-container">
            {userData.posts.map(
              (post) => (
                // eslint-disable-next-line
                (post.isMine = true),
                (
                  <div className="dashboard-post">
                    <Link
                      to={{ pathname: "/feed/post", state: { post: post } }}
                      style={{ textDecoration: "none" }}
                      key={post._id}
                    >
                      <img src={post.images[0]} alt="post" />
                    </Link>
                  </div>
                )
              )
            )}
          </div>
        </Container>
      )}
    </div>
  );
}

export default UserDashboard;
