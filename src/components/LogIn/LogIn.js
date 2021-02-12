import React, { useState } from "react";
import {Link,withRouter} from "react-router-dom";
import "./LogIn.css";
import axios from "axios";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes'



function LogIn(props){
    const [userName,setUserName]=useState("");
    const [pass,setPass]=useState("");

    async function handleSubmit(event){ 
        event.preventDefault();
        const user={
          userName:userName,
          pass:pass
        }
         await axios.post("http://localhost:3001/login",user)
          .then(async function (response) {
              props.loginHandler(response.data.token,response.data.userId,response.data.followersCount,
               response.data.followers,response.data.followingCount,response.data.following,response.data.userName,response.data.name,response.data.postCount,
                response.data.posts,response.data.website,response.data.bio,response.data.gender,response.data.email,response.data.avatar
                );
              props.history.push("/user");
              
            })
            .catch(function (error) {
              console.log(error);
            });
          }
  
    return(
      <div className="login-div-parent-container">
       <div className="login">
       <div className="header">
       <img src="https://i.imgur.com/zqpwkLQ.png" alt="Instagram"/>
       </div>
       <div className="form-input">
       <form onSubmit={event => handleSubmit(event)}>
       <input placeholder="Username" type="string" spellCheck="false" autoCapitalize="off" autoComplete="off"
       onChange={(event)=> setUserName(event.target.value)}></input>
       <input placeholder="Password" type="password" spellCheck="false" autoCapitalize="off" autoComplete="off"
       onChange={(event)=> setPass(event.target.value)}></input>
       <button type="submit">Log in</button>
       </form>
       </div>
       <div className="route">
       <p>Don't have an account? <Link to="/" style={{ textDecoration: 'none',color:"#0275d8" }}>Sign Up</Link></p>
       </div>
       </div>
       </div>
    )

    
}

const mapDispatchToProps = dispatch => {
  return {
      loginHandler:(token,userId,followersCount,followers,followingCount,following,userName,name,postCount,posts,website,bio,gender,email,avatar)=>dispatch({
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        followersCount:followersCount,
        followers:followers,
        followingCount:followingCount,
        following:following,
        postCount:postCount,
        userName:userName,
        name:name,
        posts:posts,
        email:email,
        bio:bio,
        gender:gender,
        website:website,
        avatar:avatar
      })
  };
};

const mapStateToProps = state=>{
  return{
    token:state.token
  }

}
 


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LogIn))