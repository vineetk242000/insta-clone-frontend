import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../styles/screen/EditInfo.css";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../store/actionTypes/user";
import request from "../middlewares/axios/post";
import { SET_TOASTIFY } from "../store/actionTypes/toastify";
import { useFormik } from "formik";
import { TextField, Container } from "@material-ui/core";

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
    enableReinitialize: true,
    onSubmit: async (values) => {
      const updateUserDetails = new FormData();

      updateUserDetails.append("name", values.name);
      updateUserDetails.append("userName", values.userName);
      updateUserDetails.append("email", values.email);
      updateUserDetails.append("website", values.website);
      updateUserDetails.append("bio", values.bio);
      updateUserDetails.append("gender", values.gender);
      updateUserDetails.append("avatar", values.avatar);

      const response = await request("/user/edit", updateUserDetails, token);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.EDIT_USER_DETAILS,
          payload: values,
        });
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
    },
  });

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const [previewAvatar, setPreviewAvatar] = useState(avatar);
  const [isAvatar, setIsAvatar] = useState(false);

  const handleAvatarChange = (event) => {
    event.preventDefault();
    setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
    setIsAvatar(true);
    formik.setFieldValue("avatar", event.target.files[0]);
  };

  return (
    <Container maxWidth="sm" className="edit-user-details-container">
      <form onSubmit={formik.handleSubmit}>
        <div style={{ margin: "2rem 0" }}>
          <Avatar
            style={{ height: "100px", width: "100px", left: "40%" }}
            src={
              isAvatar ? previewAvatar : avatar === undefined ? null : avatar
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
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="name"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="field-container">
          <p>User Name</p>
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="userName"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
        </div>
        <div className="field-container">
          <p>Website</p>
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="website"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </div>
        <div className="field-container">
          <p>Bio</p>
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="bio"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.bio}
          />
        </div>
        <div className="field-container">
          <p>Email</p>
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="email"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="field-container">
          <p>Gender</p>
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="gender"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.gender}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </Container>
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
