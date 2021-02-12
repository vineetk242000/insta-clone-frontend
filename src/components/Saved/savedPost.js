import React,{useEffect, useState} from 'react';
import Header from '../Header/Header';
import '../Explore/Explore.css';
import axios from 'axios';
import {connect} from 'react-redux'


function Saved(props){
    const[posts,setPosts]=useState([])


    useEffect(() =>{
        async function getSavedPosts(){
            await axios.get(`http://localhost:3001/get_saved_posts/${props.userId}`)
              .then(function (response) {
                 setPosts(response.data.posts);
              })
            .catch(function (error) {
              console.log(error);
            }); 
        }
         getSavedPosts();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[setPosts])

    return(
        <div>
            <Header />
            <div className="explore-section">
                {posts.map(post=>(
                    <img src={`http://localhost:3001/image/${post.imageUrl.slice(58,post.imageUrl.length)}`} key={post._id} alt="Explore-Posts" />
                ))}
            </div>
        </div>
    )
}


const mapStateToProps=state=>{
    return{
        followers:state.followers,
        userId:state.userId
    }
}


export default connect(mapStateToProps)(Saved);
