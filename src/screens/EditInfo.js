import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../styles/screen/EditInfo.css";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../store/actionTypes/user";
import request from "../middlewares/axios/post";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { useFormik } from "formik";

function EditUserInfo(props) {
  const { name, email, userName, bio, gender, website, avatar } = useSelector(
    (state) => state.userReducer
  );
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
      userName: userName,
      bio: bio,
      gender: gender,
      website: website,
      avatar: avatar,
    },
  });

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const [previewAvatar, setPreviewAvatar] = useState(avatar);
  const [isAvatar, setIsAvatar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateUserDetails = new FormData();

    updateUserDetails.append("name", name);
    updateUserDetails.append("userName", userName);
    updateUserDetails.append("email", email);
    updateUserDetails.append("website", website);
    updateUserDetails.append("bio", bio);
    updateUserDetails.append("gender", gender);
    updateUserDetails.append("avatar", avatar);

    const response = await request(
      "/editUserProfile",
      updateUserDetails,
      token
    );
    if (response.status === 200) {
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
              : props.avatar
          }
        />
        <p
          style={{ color: "#0095F6", cursor: "pointer" }}
          onClick={onButtonClick}
        >
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
        <input value={name} />
      </div>
      <div className="field-container">
        <p>User Name</p>
        <input value={userName} />
      </div>
      <div className="field-container">
        <p>Website</p>
        <input value={website} />
      </div>
      <div className="field-container">
        <p>Bio</p>
        <input value={bio} />
      </div>
      <div className="field-container">
        <p>Email</p>
        <input value={email} />
      </div>
      <div className="field-container">
        <p>Gender</p>
        <input value={gender} />
      </div>
      <button onClick={(event) => handleSubmit(event)}>Save Changes</button>
    </div>
  );
}

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

export default connect(null, mapDispatchToProps)(EditUserInfo);
