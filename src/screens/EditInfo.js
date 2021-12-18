import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../styles/screen/edit_info.css";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../store/actionTypes/user";
import request from "../middlewares/axios/post";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";

function EditUserInfo(props) {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();

  const [name, setName] = useState(`${props.name}`);
  const [userName, setUserName] = useState(`${props.userName}`);
  const [userWebsite, setUserWebsite] = useState(
    `${props.userWebsite === undefined ? "" : props.userWebsite}`
  );
  const [userBio, setUserBio] = useState(
    `${props.userBio === undefined ? "" : props.userBio}`
  );
  const [userEmail, setUserEmail] = useState(`${props.userEmail}`);
  const [userGender, setUserGender] = useState(
    `${props.userGender === undefined ? "" : props.userGender}`
  );

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const [avatar, setAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState(props.avatar);
  const [isAvatar, setIsAvatar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateUserDetails = new FormData();

    updateUserDetails.append("name", name);
    updateUserDetails.append("userName", userName);
    updateUserDetails.append("email", userEmail);
    updateUserDetails.append("website", userWebsite);
    updateUserDetails.append("bio", userBio);
    updateUserDetails.append("gender", userGender);
    updateUserDetails.append("image", avatar);

    const response = await request(
      "/editUserProfile",
      updateUserDetails,
      token
    );
    if (response.status === 200) {
      props.updateUserData(
        name,
        userEmail,
        userName,
        userWebsite,
        userGender,
        userBio,
        response.data.avatar
      );
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "User details updated!",
          type: "success",
          open: true,
        },
      });
      props.history.push("/dashboard");
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

  const handleAvatarChange = (event) => {
    event.preventDefault();
    setAvatar(event.target.files[0]);
    setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
    setIsAvatar(true);
  };

  return (
    <div className="edit-user-details-container">
      <div>
        <Avatar
          style={{ height: "100px", width: "100px", left: "40%" }}
          src={
            isAvatar
              ? previewAvatar
              : props.avatar === undefined
              ? null
              : `http://localhost:3001/image/${previewAvatar.slice(
                  58,
                  props.avatar.length
                )}`
          }
        />
        <p style={{ color: "#0095F6" }} onClick={onButtonClick}>
          Change Profile Photo
        </p>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(event) => handleAvatarChange(event)}
        />
      </div>
      <div className="field-container">
        <p>Name</p>
        <input onChange={(event) => setName(event.target.value)} value={name} />
      </div>
      <div className="field-container">
        <p>User Name</p>
        <input
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
        />
      </div>
      <div className="field-container">
        <p>Website</p>
        <input
          onChange={(event) => setUserWebsite(event.target.value)}
          value={userWebsite}
        />
      </div>
      <div className="field-container">
        <p>Bio</p>
        <input
          onChange={(event) => setUserBio(event.target.value)}
          value={userBio}
        />
      </div>
      <div className="field-container">
        <p>Email</p>
        <input
          onChange={(event) => setUserEmail(event.target.value)}
          value={userEmail}
        />
      </div>
      <div className="field-container">
        <p>Gender</p>
        <input
          onChange={(event) => setUserGender(event.target.value)}
          value={userGender}
        />
      </div>
      <button onClick={(event) => handleSubmit(event)}>Save Changes</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userName: state.userName,
    name: state.name,
    userWebsite: state.website,
    userEmail: state.email,
    userGender: state.gender,
    userBio: state.bio,
    avatar: state.avatar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (name, email, userName, website, gender, bio, avatar) =>
      dispatch({
        type: actionTypes.EDIT_USER_DETAILS,
        name: name,
        email: email,
        userName: userName,
        website: website,
        gender: gender,
        bio: bio,
        avatar: avatar,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserInfo);
