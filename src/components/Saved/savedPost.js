import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../Explore/Explore.css";
import { connect, useDispatch, useSelector } from "react-redux";
import request from "../../middlewares/axios/get";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";

function Saved(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getSavedPosts() {
      const response = await request("/savedPosts");
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
    getSavedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPosts]);

  return (
    <div>
      <Header />
      <div className="explore-section">
        {posts.map((post) => (
          <img
            src={`http://localhost:3001/image/${post.imageUrl.slice(
              58,
              post.imageUrl.length
            )}`}
            key={post._id}
            alt="Explore-Posts"
          />
        ))}
      </div>
    </div>
  );
}

export default Saved;
