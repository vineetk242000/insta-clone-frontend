import React, { useEffect, useState } from "react";
import "../styles/component/followers.css";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import axios from "axios";

const MapFollowers = (props) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const userId = props.userId;

    const getFollowers = async () => {
      await axios
        .get(`http://localhost:3001/getFollowers/${userId}`)
        .then(function (response) {
          setFollowers(response.data.users);
          console.log(response.data.users);
        })
        .catch(function (error) {
          console.log(error);
        });
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
          <p>{user.userName}</p>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followers: state.followers,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(MapFollowers);
