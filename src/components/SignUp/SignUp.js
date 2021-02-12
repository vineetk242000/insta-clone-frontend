import React , { useState } from "react";
import {Link,withRouter} from "react-router-dom"
import "./SignUp.css";
import axios from "axios";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';



function SignUp(props){

  
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [userName,setUserName]=useState("");
    const [open,setOpen]=useState(false);
    const [message,setMessage] = useState("");
    const [severity,setSeverity] = useState("");
    
    

    const handleClose =()=>{
      setOpen(false);
    }

    async function handleSubmit(event){ 
      event.preventDefault();
      const user={
        name:name,
        email:email,
        pass:pass,
        userName:userName
      }
       await axios.post("http://localhost:3001/register",user)
        .then(function (response) {
          if(response.data.success === true){
            props.history.push("/login");
            setMessage("Account Created!");
            setSeverity("success");
            setOpen(true)

          }
            
          })
          .catch(function (error) {
            console.log(error);
          });

    }

  

    return(
    <div className="register-div-parent-container">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
            {message}
         </Alert>
      </Snackbar>
      <div className="register">
       <div className="header">
       <img src="https://i.imgur.com/zqpwkLQ.png" alt="Instagram"/>
       <h3>Sign up to see photos and videos from your friends</h3>
       </div>
       <div className="form-input">
       <form onSubmit={event => handleSubmit(event)}>
       <input placeholder="Email" type="email" spellCheck="false" autoCapitalize="off"
       onChange={(event)=> setEmail(event.target.value)} autoComplete="off"></input>
       <input placeholder="Full Name" type="string" spellCheck="false" autoCapitalize="off"
       onChange={(event)=> setName(event.target.value)} autoComplete="off"></input>
       <input placeholder="Username" type="string" spellCheck="false" autoCapitalize="off"
       onChange={(event)=> setUserName(event.target.value)} autoComplete="off"></input>
       <input placeholder="Password" type="password" spellCheck="false" autoCapitalize="off"
       onChange={(event)=> setPass(event.target.value)} autoComplete="off"></input>
       <button type="submit">Sign up</button>
       </form>
       </div>
       <div className="route">
       <p>Have an Account? <Link to="/login"  style={{ textDecoration: 'none',color:"#0275d8" }}>Log in</Link></p>
       </div>
       </div>
       </div>
    )
}



export default withRouter(SignUp);