import * as actionTypes from "../actionTypes/user";
import { updateObject } from "../utility";

const initialState = {
  name: "",
  website: "",
  email: "",
  bio: "",
  gender: "",
  userName: "",
  avatar: "",
  followingCount: 0,
  followersCount: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return updateObject(state, {
        website: action.payload.website,
        email: action.payload.email,
        bio: action.payload.bio,
        gender: action.payload.gender,
        name: action.payload.name,
        userName: action.payload.userName,
        avatar: action.payload.avatar,
        followingCount: action.payload.following.length,
        followersCount: action.payload.followers.length,
      });
    case actionTypes.EDIT_USER_DETAILS:
      return updateObject(state, {
        website: action.payload.website,
        email: action.payload.email,
        bio: action.payload.bio,
        gender: action.payload.gender,
        name: action.payload.name,
        userName: action.payload.userName,
        avatar: action.payload.avatar,
      });
    case actionTypes.DEC_FOLLOWING_COUNT:
      return updateObject(state, {
        followingCount: state.followingCount - 1,
      });
    case actionTypes.INC_FOLLOWING_COUNT:
      return updateObject(state, {
        followingCount: state.followingCount + 1,
      });
    default:
      return state;
  }
};

export default userReducer;
