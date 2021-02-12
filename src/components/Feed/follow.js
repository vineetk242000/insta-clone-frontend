import React, { useEffect,useState } from 'react';
import axios from 'axios';
import './Feed.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';




const Follow = (props)=>{

    const [follow,setFollow] = useState(props.follow);

    useEffect(()=>{
        setFollow(props.follow);
    },[props.follow]);

    const followUser = async(event)=>{
        event.preventDefault();
        await axios.get(`http://localhost:3001/follow/${props.userId}/${props.userIdToFollow.toString()}`)
            .then(function (response) {
                console.log(response);
                setFollow(true);
                props.incFollowingCount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    if(follow){
        return <button style={{display:"inlineBlock",verticalAlign:"top",marginTop:"5px", color:"grey"}} type="button" >
            Followed</button>
    }

    if(!follow){
        return <button style={{display:"inlineBlock",verticalAlign:"top",marginTop:"5px"}} 
        type="submit" onClick={event=>followUser(event)} >
            Follow</button>
    }

    

}

const mapDispatchToProps = dispatch =>{
    return{
        incFollowingCount :()=>dispatch({
            type:actionTypes.INC_FOLLOWING_COUNT
        })
    }
}

export default connect(null,mapDispatchToProps)(Follow);