import React,{useState} from 'react';
import './post.css';
import Header from '../Header/Header';
import Avatar from '@material-ui/core/Avatar';
import { CommentIcon , InboxIcon , MoreIcon } from "../Icons";
import {connect} from 'react-redux';
import Like from '../LikePost';
import Save from '../SavePost';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DeletePost from '../DeletePost/deletePost'


const Post = (props)=>{

    const post= props.location.state.post;
    const [likes,setLikes] = useState(post.likesCount);
    const [comment,setComment] = useState("");
    const [newComment,setNewComment] = useState([]);
    const [open,setOpen] = useState(false);

    const handleAddComment =async(event)=>{
        event.preventDefault();
        if(comment!=null){
            const addComment={
                comment:comment,
                userId:props.userId,
                postId:post._id.toString()
            }
        
            await axios.post("http://localhost:3001/add_comment",addComment)
            .then(function (response) {
                console.log(response);
                setComment("")
                const addedComment = response.data.comment;
                setNewComment(newComment=>[...newComment,addedComment])

            })
            .catch(function (error) {
                console.log(error);
            });
        }
    } 

    const incLikes = ()=>{
        setLikes(likes+1);
        post.likesCount=post.likesCount+1;
        post.isLiked=true;
    }

    const decLikes = ()=>{
        setLikes(likes-1);
        post.likesCount=post.likesCount-1;
        post.isLiked=false;
    }

    const savePost=()=>{
        post.isSaved=true;
    }

    const unsavePost=()=>{
        post.isSaved=false;
    }

    return(
        <div>
            <Header />
        <div className="single-post-parent-container">
            <DeletePost open={open} setOpen={setOpen} userId={post.user._id} postId={post._id}/>
        <div className="single-post-container">
        <div className="left-image-container">
            <img src={`http://localhost:3001/image/${post.imageUrl.slice(58,post.imageUrl.length)}`} alt="post"/>
        </div>
        <div className="single-post-details-container">
            <div className="post-posted-by-user">
            <Avatar style={{height:"30px",width:"30px",display:"inline-block",verticalAlign:"middle",border: 0, objectFit: 'cover'}} src=
            {post.user.avatar===undefined?null:`http://localhost:3001/image/${post.user.avatar.slice(58,post.user.avatar.length)}`} size={100}  />
            <Link to={{ pathname: '/user/dashboard', state: { userId: post.user._id.toString()} }}  style={{textDecoration:"none",color:"black"}} >
                 <p style={{fontWeight:"500"}}>{post.user.userName}</p></Link>
                {post.isMine!==undefined && post.isMine===true?
                <div onClick={event=>setOpen(true)} style={{display:"inline-block",position:"relative", left:"60%"}}>
                     <MoreIcon style={{display:"inline-block",verticalAlign:"middle"}}/></div>
                
                :null} 
            </div>
            <div className="post-caption"><Avatar style={{height:"30px",width:"30px",display:"inline-block",verticalAlign:"middle",border: 0, objectFit: 'cover'}} 
            src={post.user.avatar===undefined?null:
                   `http://localhost:3001/image/${post.user.avatar.slice(58,post.user.avatar.length)}`} size={100}/>
            <p style={{fontWeight:"500"}}>{post.user.userName}</p><p>{post.caption}</p></div>
            <div className="comments-container">
                {post.comments.map(comment=>(
                <div className="user-comment">
                    <div className="user-comment-left">
                <Avatar style={{height:"30px",width:"30px",display:"inline-block",verticalAlign:"middle",border: 0, objectFit: 'cover'}} 
                src={comment.user.avatar===undefined?null:
                   `http://localhost:3001/image/${comment.user.avatar.slice(58,comment.user.avatar.length)}`} size={100}/>
                </div>
                <div className="user-comment-right">
                <p style={{fontWeight:"500"}}>{comment.user.userName}</p><p style={{marginLeft:"7px"}}>{comment.text}</p>
                </div>
                </div>
                ))}
                 {newComment.map(comment=>(
                <div className="user-comment">
                    <div className="user-comment-left">
                <Avatar style={{height:"30px",width:"30px",display:"inline-block",verticalAlign:"middle",border: 0, objectFit: 'cover'}} 
                src={comment.user.avatar===undefined?null:
                   `http://localhost:3001/image/${comment.user.avatar.slice(58,comment.user.avatar.length)}`} size={100}/>
                </div>
                <div className="user-comment-right">
                <p style={{fontWeight:"500"}}>{comment.user.userName}</p><p style={{marginLeft:"7px"}}>{comment.text}</p>
                </div>
                </div>
                ))}
            </div>
            <div className="single-post-action-container">
                <Like isLiked={post.isLiked} postId={post._id.toString()} incLikes={incLikes} decLikes={decLikes} />
                <CommentIcon style={{margin:"5px 5px"}} />
                <InboxIcon style={{margin:"5px 5px"}} />
                <div style={{position:"relative",left:"55%",display:"inline-block"}}><Save  isSaved={post.isSaved} postId={post._id.toString()} savePost={savePost} unsavePost={unsavePost} /></div>
                <p style={{fontWeight:"500",fontSize:"15px",lineHeight:"0"}}>{likes} likes</p>
            </div>
            <div className="new-comment-container">
            <form onSubmit={event => handleAddComment(event)} >
            <input type="string" placeholder="Add a Comment.." value={comment} onChange={(event)=>setComment(event.target.value)}></input>
            <button type="submit">Post</button>
            </form>
            </div>
        

        </div>
        </div>
        </div>
        </div>
        
    )
}

const mapStateToProps=state=>{
    return{
        userId:state.userId,
        userName:state.userName,
        avatar:state.avatar
    }
}


export default connect(mapStateToProps)(Post);