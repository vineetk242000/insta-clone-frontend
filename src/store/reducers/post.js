import * as actionTypes from "../actionTypes/post";
import { updateObject } from "../utility";
const initialState = {
  posts: [],
  postCount: 0,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_CREATED:
      return updateObject(state, {
        postCount: state.postCount + 1,
      });
    case actionTypes.POST_DELETED:
      return updateObject(state, {
        postCount: state.postCount - 1,
      });
    case actionTypes.UPDATE_POST:
      return updateObject(state, {
        posts: action.posts,
      });
    default:
      return state;
  }
};

export default postsReducer;
