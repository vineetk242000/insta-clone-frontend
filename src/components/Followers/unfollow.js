import React, { useEffect,useState } from 'react';
import './followers.css';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../store/actions/actionTypes';



const Unfollow = (props)=>{

    const [unfollow,setUnfollow] = useState(props.unfollow);
    const userId = props.userId;

    useEffect(()=>{
        setUnfollow(props.unfollow);
    },[props.unfollow])



    const handleFollowUser = async(event)=>{
        event.preventDefault();
        await axios.get(`http://localhost:3001/follow/${userId}/${props.userIdToUnfollow.toString()}`)
            .then(function (response) {
                console.log(response);
                setUnfollow(false);
                props.incFollowingCount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleUnfollowUser = async(event)=>{
        event.preventDefault();
        await axios.get(`http://localhost:3001/unfollow/${userId}/${props.userIdToUnfollow.toString()}`)
            .then(function (response) {
                console.log(response);
                setUnfollow(true);
                props.decFollowingCount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }




        if(unfollow){
           return <button type="submit" style={{color:"black",backgroundColor:"white",border:"0.5px solid grey"}} onClick={event=>handleFollowUser(event)}>Follow</button>
        }

        if(!unfollow){
           return <button type="submit" onClick={event=>handleUnfollowUser(event)}>Unfollow</button>
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