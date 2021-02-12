import React,{useEffect,useState} from "react";
import {HeartIcon , FilledHeartIcon} from "./Icons";
import axios from 'axios';
import {connect} from 'react-redux';

const LikePost = (props)=>{
    const [likedState, setLiked] = useState(props.isLiked);
    const userId = props.userId;

    useEffect(() => {
      setLiked(props.isLiked);
    }, [props.isLiked]);
  
    const handleToggleLike = async () => {
      if (likedState) {
        setLiked(false);
        await axios.get(`http://localhost:3001/unlikePost/${props.postId}/${userId}`)
            .then(function (response) {
                console.log(response);
                props.decLikes();
            })
            .catch(function (error) {
                console.log(error);
            });
      } else {
        setLiked(true);
        await axios.get(`http://localhost:3001/likePost/${props.postId}/${userId}`)
            .then(function (response) {
                console.log(response);
                props.incLikes()
            })
            .catch(function (error) {
                console.log(error);
            });
      }
    };
  
    if (likedState) {
      return <FilledHeartIcon onClick={handleToggleLike}  style={{margin:"5px 5px 5px 0",width:"24px",height:"24px"}} />;
    }
  
    if (!likedState) {
      return <HeartIcon onClick={handleToggleLike} style={{margin:"5px 5px 5px 0",width:"24px",height:"24px"}} />;
    }
}

const mapStateToProps=state=>{
    return{
        userId:state.userId
    }
}


export default connect(mapStateToProps)(LikePost);