import React, { useState, useEffect } from "react";
import "./followers.css";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import axios from "axios";
import Unfollow from "./unfollow";
import { Link } from "react-router-dom";

const MapFolllowing = (props) => {
  const userId = props.userId;
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      await axios
        .get(`http://localhost:3001/getFollowedUsers/${userId}`)
        .then(function (response) {
          setFollowedUsers(response.data.users);
        })
        .catch(function (error) {
          console.log(error);
        });
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
            src={
              user.avatar === undefined
                ? null
                : `http://localhost:3001/image/${user.avatar.slice(
                    58,
                    user.avatar.length
                  )}`
            }
            size={100}
          />
          <Link
            to={{
              pathname: "/user/dashboard",
              state: { userId: user._id.toString() },
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <p>{user.userName}</p>
          </Link>
          <Unfollow userIdToUnfollow={user._id} unfollow={false} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    following: state.following,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(MapFolllowing);
