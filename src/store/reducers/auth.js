import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';


const initialState ={
    token:null,
    userId:null,
    followersCount:null,
    followers:[],
    followingCount:null,
    following:[],
    postCount:null,
    userName:null,
    name:null,
    posts:[],
    website:null,
    email:null,
    bio:null,
    gender:null,
    avatar:null,
    error:null,
    loading:false
}

const reducer = (state=initialState,action)=>{
    switch (action.type){
        case actionTypes.AUTH_START:
            return updateObject(state,{error:null,loading:true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state,{
                token:action.idToken,
                userId:action.userId,
                followersCount:action.followersCount,
                followers:action.followers,
                followingCount:action.followingCount,
                following:action.following,
                postCount:action.postCount,
                userName:action.userName,
                name:action.name,
                posts:action.posts,
                email:action.email,
                bio:action.bio,
                website:action.website,
                gender:action.gender,
                avatar:action.avatar,
                error:null,
                loading:false
            })
        case actionTypes.AUTH_FAIL:
            return updateObject(state,{error:action.error,loading:false});
        case actionTypes.POST_CREATED:
            return updateObject(state,{
                postCount:state.postCount+1,
            })
        case actionTypes.POST_DELETED:
            return updateObject(state,{
                postCount:state.postCount-1,
            })
        case actionTypes.UPDATE_POST:
            return updateObject(state,{
                posts:action.posts
            })
        case actionTypes.EDIT_USER_DETAILS:
            return updateObject(state,{
                website:action.website,
                email:action.email,
                bio:action.bio,
                gender:action.gender,
                name:action.name,
                userName:action.userName,
                avatar:action.avatar
            })
        case actionTypes.DEC_FOLLOWING_COUNT:
            return updateObject(state,{
                followingCount:state.followingCount-1
            })
        case actionTypes.INC_FOLLOWING_COUNT:
            return updateObject(state,{
                followingCount:state.followingCount+1
            })
        default:
            return state;
    }
}

export default reducer;


