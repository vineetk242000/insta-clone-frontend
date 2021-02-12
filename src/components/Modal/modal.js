import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../store/actions/actionTypes';


function FormDialog(props) {
  
    const[selectedFile,setSelectedFile]=useState();
    const [caption,setCaption]=useState("");
    const [imagePreview,setImagePreview]=useState();
    const postCreator=props.userId;
    const handleClose = () => {
      props.setOpen(false);
    };

    

    const refreshDashoard=async()=>{
      await axios.get(`http://localhost:3001/getPosts/${props.userId}`)
        .then(response=>{
          console.log(response);
          props.updatePost(response.data.posts);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleSubmit = async()=>{
        const newPost = new FormData();
        newPost.append('caption',caption);
        newPost.append('user',postCreator);
        newPost.append('image',selectedFile);

        await axios.post("http://localhost:3001/createPost",newPost)
        .then(response=>{
            props.newPostCreated();
            refreshDashoard();
            props.setOpen(false);
        })
        .catch(err=>{
            console.log(err);
        })
        
    }

    const handleInputChange= async(event)=>{
      setSelectedFile(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]))

    }
  
    return (
      <div>
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Post</DialogTitle>
          <form method="post" onSubmit={handleSubmit}  >
          <DialogContent>
            <DialogContentText>
              Photo should not exceed more than 300 by 200 ratio.
            </DialogContentText>
            <input type="file" onChange={(event)=> handleInputChange(event)} style={{display:"block",marginBottom:"25px"}} />
            {imagePreview === undefined?null:<img src={imagePreview} height="40%" width="40%" style={{position:"relative",left:"30%"}} alt="Preview" />}
            <TextField
              autoFocus={false}
              margin="dense"
              type="text"
              fullWidth
              onChange={(event)=>setCaption(event.target.value)}
              style={{outline:"black"}}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>
              Create Post
            </Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
}

const mapStateToProps = state=>{
    return{
        userId:state.userId,
        posts:state.posts,
    }
}

const mapDispatchToProps = dispatch=>{
  return{
    newPostCreated:()=> dispatch({
      type:actionTypes.POST_CREATED,
    }),
    updatePost:(posts)=>dispatch({
      type:actionTypes.UPDATE_POST,
      posts:posts
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FormDialog); 