import React,{useEffect, useState} from 'react';
import Header from '../Header/Header';
import './Explore.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'


function Explore(props){
    const[posts,setPosts]=useState([])


    useEffect(() =>{
        async function getExploreContent(){
            await axios.get("http://localhost:3001/explore")
              .then(function (response) {
                 setPosts(response.data.posts);
                 console.log(response.data.posts);
              })
            .catch(function (error) {
              console.log(error);
            }); 
        }
         getExploreContent();
    },[])

    return(
        <div>
            <Header />
            <div className="explore-section">
                {posts.map(post=>(
                    <Link to={{ pathname: '/feed/post', state: { post: post} }}  style={{textDecoration:"none"}} >
                        <img src={`http://localhost:3001/image/${post.imageUrl.slice(58,post.imageUrl.length)}`} key={post._id} alt="Explore-Posts" />
                    </Link>
                ))}
            </div>
        </div>
    )
}


const mapStateToProps=state=>{
    return{
        userId:state.userId
    }
}


export default connect(mapStateToProps)(Explore);
