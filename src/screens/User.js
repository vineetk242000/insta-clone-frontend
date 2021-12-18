import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../styles/screen/Dashboard.css";
import { PostIcon } from "../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import Follow from "../components/follow";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

function UserDashboard(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const userId = props.location.state.userId;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await request(`/getUser/${userId}`, token);
      if (response.status === 200) {
        setUserData(response.data.userData);
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
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {userData === null ? (
        <div />
      ) : (
        <div>
          <div className="dashboard-container">
            <div className="top">
              <div style={{ display: "inline-block", width: "250px" }}>
                <Avatar
                  style={{
                    height: "175px",
                    width: "175px",
                    verticalAlign: "middle",
                    border: 0,
                    objectFit: "cover",
                  }}
                  src={
                    userData.avatar === undefined
                      ? null
                      : `http://localhost:3001/image/${userData.avatar.slice(
                          58,
                          userData.avatar.length
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
                  <p>{userData.userName}</p>
                  <span>
                    <Follow
                      follow={userData.isFollowed}
                      userIdToFollow={userData._id}
                    />
                  </span>
                </div>
                <div className="count">
                  <p>
                    <span className="bold">{userData.postCount}</span> posts
                  </p>
                  <p>
                    <span className="bold">{userData.followersCount}</span>{" "}
                    followers
                  </p>
                  <p>
                    <span className="bold">{userData.followingCount}</span>{" "}
                    following
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
          </div>
          <div className="posts-section">
            <div className="posts-section-header">
              <PostIcon />
              <p className="posts-section-title">POSTS</p>
            </div>
          </div>
          <div className="my-posts-container">
            {userData.posts.map((post) => (
              <Link
                to={{ pathname: "/feed/post", state: { post: post } }}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={`http://localhost:3001/image/${post.imageUrl.slice(
                    58,
                    post.imageUrl.length
                  )}`}
                  key={post._id.toString()}
                  alt="post"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
