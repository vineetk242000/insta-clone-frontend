import React, { useEffect, useState } from "react";
import "../styles/screen/Explore.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

function Explore(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getExploreContent() {
      const response = request("/explore", token);
      if (response.status === 200) {
        setPosts(response.data.posts);
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
    }
    getExploreContent();
  }, []);

  return (
    <div className="explore-section">
      {posts.map((post) => (
        <Link
          to={{ pathname: "/feed/post", state: { post: post } }}
          style={{ textDecoration: "none" }}
        >
          <img
            src={`http://localhost:3001/image/${post.imageUrl.slice(
              58,
              post.imageUrl.length
            )}`}
            key={post._id}
            alt="Explore-Posts"
          />
        </Link>
      ))}
    </div>
  );
}

export default Explore;
