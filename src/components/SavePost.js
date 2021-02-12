import React,{useEffect,useState} from "react";
import {BookmarkIcon , FilledBookmarkIcon} from "./Icons";
import axios from 'axios';
import {connect} from 'react-redux';


const SavePost = (props)=>{
    const [savedState, setSaved] = useState(props.isSaved);
    const userId = props.userId;

    useEffect(() => {
      setSaved(props.isSaved);
    }, [props.isSaved]);

  
    const handleToggleSave =async () => {

        if (savedState) {
            setSaved(false);
            await axios.get(`http://localhost:3001/unsavepost/${props.postId}/${userId}`)
            .then(function (response) {
                console.log(response);
                props.unsavePost();
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            setSaved(true);
            await axios.get(`http://localhost:3001/savepost/${props.postId}/${userId}`)
            .then(function (response) {
                console.log(response);
                props.savePost();
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };
  
    if (savedState) {
      return <FilledBookmarkIcon onClick={handleToggleSave} style={{margin:"5px 5px",height:"23px", width:"23px"}} />;
    }
  
    if (!savedState) {
      return <BookmarkIcon onClick={handleToggleSave} style={{margin:"5px 5px",height:"23px", width:"23px"}}/>;
    }
}

const mapStateToProps=state=>{
    return{
        userId:state.userId
    }
}


export default connect(mapStateToProps)(SavePost);