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
  follwersCount: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_USER_DETAILS:
      return updateObject(state, {
        website: action.website,
        email: action.email,
        bio: action.bio,
        gender: action.gender,
        name: action.name,
        userName: action.userName,
        avatar: action.avatar,
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
