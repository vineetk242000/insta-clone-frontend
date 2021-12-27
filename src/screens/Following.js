import React, { useState, useEffect } from "react";
import "../styles/component/Followers.css";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux";
import FollowButton from "../components/FollowButton";
import { Link } from "react-router-dom";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

const MapFolllowing = (props) => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      const response = await request("/user/followings", token);
      if (response.status === 200) {
        setFollowedUsers(response.data.users);
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            open: true,
            msg: "Something went wrong!",
          },
        });
      }
    };
    getFollowing();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="following-follower-parent-container">
      {followedUsers.map((user) => (
        <div className="map-follow-follower">
          <Avatar
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              border: 0,
              objectFit: "cover",
            }}
            src={user.avatar === undefined ? null : user.avatar}
            size={100}
          />
          <Link
            to={`/user/${user.userName}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <p>{user.userName}</p>
          </Link>
          <FollowButton
            userId={user._id}
            follow={true}
            userName={user.userName}
          />
        </div>
      ))}
    </div>
  );
};

export default MapFolllowing;
