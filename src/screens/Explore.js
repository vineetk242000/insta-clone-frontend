import React, { useEffect, useState } from "react";
import "../styles/screen/Explore.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import request from "../middlewares/axios/get";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { Container } from "@material-ui/core";

function Explore() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getExploreContent = async () => {
      const response = await request("/posts/explore", token);
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
    };
    getExploreContent();
  }, []);

  return (
    <Container maxWidth="md" className="explore-section">
      {posts.map((post) => (
        <Link
          to={{ pathname: "/feed/post", state: { post: post } }}
          style={{ textDecoration: "none" }}
        >
          <img src={post.images[0]} key={post._id} alt="Explore-Posts" />
        </Link>
      ))}
    </Container>
  );
}

export default Explore;
