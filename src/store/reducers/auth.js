import * as actionTypes from "../actionTypes/auth";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.payload,
        error: false,
      });
    case actionTypes.AUTH_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default authReducer;
