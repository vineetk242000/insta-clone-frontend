import React, { useEffect,useState } from 'react';
import '../Dashboard/Dashboard.css';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../store/actions/actionTypes';



const Unfollow = (props)=>{

    const [follow,setFollow] = useState(props.follow);
    const userId = props.userId;

    useEffect(()=>{
        setFollow(props.follow);
    },[props.follow])



    const handleFollowUser = async(event)=>{
        event.preventDefault();
        await axios.get(`http://localhost:3001/follow/${userId}/${props.userIdToFollow.toString()}`)
            .then(function (response) {
                console.log(response);
                setFollow(true);
                props.incFollowingCount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleUnfollowUser = async(event)=>{
        event.preventDefault();
        await axios.get(`http://localhost:3001/unfollow/${userId}/${props.userIdToFollow.toString()}`)
            .then(function (response) {
                console.log(response);
                setFollow(false);
                props.decFollowingCount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


       if(follow){
             return <button type="submit" style={{color:"black",backgroundColor:"white",border:"0.5px solid grey", borderRadius: "3px",
                fontWeight: "400",
                outline:"none",
                padding:"5px"}}  onClick={event=>handleUnfollowUser(event)}>Unfollow</button>
         }

        if(!follow){
           return <button type="submit" style={{ backgroundColor: "#0095F6",
            color: "white",
            borderRadius: "3px",
            fontWeight: "400",
            outline:"none",
            border: "none",
            padding:"5px"}} onClick={event=>handleFollowUser(event)}>Follow</button>
        }

}

const mapStateToProps=state =>{
    return{
        userId:state.userId
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        incFollowingCount :()=>dispatch({
            type:actionTypes.INC_FOLLOWING_COUNT
        }),

        decFollowingCount: ()=>dispatch({
            type:actionTypes.DEC_FOLLOWING_COUNT
        })
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(Unfollow);