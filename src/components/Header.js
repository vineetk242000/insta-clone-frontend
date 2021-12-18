import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/component/Header.css";
import { HomeIcon, ExploreIcon, HeartIcon, BookmarkIcon } from "./Icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { connect } from "react-redux";

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUsers = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:3001/search/${searchInput}`)
      .then(async function (response) {
        console.log(response);
        props.history.push("/search_results");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="navbar-parent-container">
      <div className="navbar">
        <img src="https://i.imgur.com/zqpwkLQ.png" alt="Instagram" />
        <form onSubmit={getUsers}>
          <input
            placeholder="Search"
            onChange={(event) => setSearchInput(event.target.value)}
          ></input>
        </form>
        <ul>
          <li style={{ padding: "0" }}>
            <Link to="/user">
              <HomeIcon />
            </Link>
          </li>
          <li>
            <Link to="/explore">
              <ExploreIcon />
            </Link>
          </li>
          <li>
            <HeartIcon />
          </li>
          <li>
            <img
              style={{
                display: "inline-block",
                height: "25px",
                width: "25px",
                verticalAlign: "top",
                borderRadius: "50%",
                objectFit: "fit",
              }}
              size={100}
              alt="avatar"
              src={
                props.avatar === undefined
                  ? require("../default_avatar.jpg")
                  : `http://localhost:3001/image/${props.avatar.slice(
                      58,
                      props.avatar.length
                    )}`
              }
              onClick={handleClick}
            />
          </li>
        </ul>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ position: "absolute", top: "35px" }}
      >
        <MenuItem>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "black" }}
          >
            <AccountCircleOutlinedIcon style={{ verticalAlign: "middle" }} />
            <span style={{ fontSize: "14px", marginLeft: "5px" }}>Profile</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/savedPosts"
            style={{ textDecoration: "none", color: "black" }}
          >
            <BookmarkIcon
              style={{
                fontWeight: "1000",
                verticalAlign: "middle",
                height: "18px",
              }}
            />
            <span style={{ fontSize: "14px", marginLeft: "5px" }}>Saved</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <a href="/login" style={{ textDecoration: "none", color: "black" }}>
            <ExitToAppOutlinedIcon style={{ verticalAlign: "middle" }} />
            <span style={{ fontSize: "14px", marginLeft: "5px" }}>Logout</span>
          </a>
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    avatar: state.avatar,
  };
};

export default connect(mapStateToProps)(withRouter(Header));