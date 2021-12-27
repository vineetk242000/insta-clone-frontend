import React, { useEffect, useState } from "react";
import "../styles/component/Followers.css";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { Link } from "react-router-dom";
import request from "../middlewares/axios/get";

const MapFollowers = (props) => {
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    const getFollowers = async () => {
      const response = await request("/user/followers", token);
      if (response.status === 200) {
        setFollowers(response.data.users);
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

    getFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="following-follower-parent-container">
      {followers.map((user) => (
        <div className="map-follow-follower" key={user._id}>
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
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default MapFollowers;
