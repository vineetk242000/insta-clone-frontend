import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';
import Avatar from '@material-ui/core/Avatar';
import './Feed.css';
import {connect} from 'react-redux';
import axios from 'axios';
import Follow from './follow';
import SinglePost from './feedPost'


function Feed(props){
     
    const [suggestedUsers,setSuggestedUsers]=useState([]);
    const [feed,setFeed] =useState([])
    const userId=props.userId;

     

    useEffect(()=>{

        const getFeed=async()=>{
            await axios.get(`http://localhost:3001/getFeed/${userId}`)
            .then(function (response) {
                setFeed(response.data.posts);
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
        
        }

        const getFollowSuggestions = async()=>{
            await axios.get(`http://localhost:3001/suggestions/${userId}`)
            .then(function (response) {
                console.log(response);
                setSuggestedUsers(response.data.users);
            })
            .catch(function (error) {
                console.log(error);
            });
        
        }

        getFeed();

        getFollowSuggestions();
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return(
        <div>
        <Header />
        <div className="feed-section">
            <div className="posts" >
            {feed.map(post=>(
            <SinglePost post={post}  />

            ))}
            </div>
            <div className="feed-right-container">
            <div className="current-user-section">
                <Avatar style={{display:"inline-block",height:"50px",width:"50px",border: 0, objectFit: 'cover'}} 
                src={props.avatar===undefined?null:
                    `http://localhost:3001/image/${props.avatar.slice(58,props.avatar.length)}`} />
                <div className="current-user-userName"><p style={{fontWeight:"500"}}>{props.userName}</p><p>{props.name}</p></div>
                <a href="/login" style={{display:"inlineBlock",position:"relative",top:"14px",verticalAlign:"top", color:"grey",textDecoration:"none"}} >
                    Logout</a></div>
        
            <div className="follow-suggestions-section">
            <p>Suggestions for you  <span style={{marginLeft:"80px",color:"#55B7F7"}}>See all</span></p>
            {suggestedUsers.map(user=>(
                 <div className="suggested-users-container" key={user._id.toString()}>
                    <Avatar style={{display:"inline-block",border: 0, objectFit: 'cover'}} src={user.avatar===undefined?null:
                    `http://localhost:3001/image/${user.avatar.slice(58,user.avatar.length)}`} size={100}/>
                    <div className="current-user-userName">
                    <Link to={{ pathname: '/user/dashboard', state: { userId: user._id.toString()} }}  style={{textDecoration:"none",color:"black"}} ><p style={{fontWeight:"500"}}>{user.userName}</p></Link><p >{user.name}</p></div>
                        <Follow userId={userId} userIdToFollow={user._id} follow={false} /></div>

            ))}

            </div>
            </div>
            </div>
        </div>
    )
    
}

const mapStateToProps=state=>{
    return{
        name:state.name,
        userName:state.userName,
        userId:state.userId,
        avatar:state.avatar
    }
}


export default connect(mapStateToProps)(Feed);