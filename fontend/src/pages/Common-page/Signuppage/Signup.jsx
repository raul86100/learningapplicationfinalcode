import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import image from "../../../imgaes/image";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const admintoken=useRef(null);




  const navigate = useNavigate();
  const userid=useRef(null);
const [adminemail,setAdminemail]=useState("");
const [adminpassword,setAdminPassword]=useState("");
  const fetchapicall =  async (obj) => {
   const data={email:obj.email,
  userName:obj.name};
  localStorage.setItem("username",data.userName);

  try {
    const response = await axios.post("http://localhost:8000/userLogin", data);
    // console.log(response.data,"userid")
    userid.current=response.data;
    localStorage.setItem("Userid",userid.current.userId);
    
    localStorage.setItem("Token",userid.current.token);
    console.log(userid.current.token)
    console.log(localStorage.getItem("Token"));
    
  } catch (error) {
    navigate("/");
  }

 
   
    
  
  };

  const adminlogin = async() => {
    const data={email:adminemail,
      password:adminpassword};
   
    try {
      console.log("enter");
      const response = await axios.post("http://localhost:8000/login", data);
      // console.log(response.data,"userid")
       admintoken.current=response.data;
      localStorage.setItem("AdminToken",admintoken.current);
      
     // localStorage.setItem("Token",userid.current.token);
      console.log(admintoken);
      console.log(localStorage.getItem("AdminToken"));
     navigate("/admin");
      
    } catch (error) {
      alert("check the UserId and Password");
      console.log(error);
    }
// if((admintoken.current).length() !==0){
    
//    navigate("/admin"); } 
   
  }

  return (
    <div>
      {/* <form > */}
        <div className="signup-page">
          <div className="image-div">
            <img src={image.signupimg} width="100%" className="sign-up-img" />
          </div>

          <div className="register_form">
            

            <div className="adminlogin">
              <p className="signuptitle">Sign In as Admin</p>
              <div>
                <input type="text" style={{borderRadius:20}} placeholder="Username" onChange={(e)=> setAdminemail(e.target.value)} required/>
              </div>
              <div>
                <input type="password" style={{borderRadius:20}} placeholder="password" onChange={(e)=> setAdminPassword(e.target.value)} required/>
              </div>
              <div>
                <button  className='button-3'   onClick={async()=>{await adminlogin()}} >Login</button>
               
              </div>
            </div>
            <h1 style={{fontSize:30}} className="or">OR</h1>
            <div>
              <p className="signuptitle">Sign In with Google</p>
            </div>
            <div className="google-login-button">
              <GoogleOAuthProvider clientId="103138130018-v3tpihc0ntt1vj1i3ntqkmohi0vu6bgj.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={async(credentialResponse) => {
                    //details=jwt_decode(credentialResponse);
                    // setUserinfo(jwt_decode(credentialResponse.credential));
                   await fetchapicall(jwt_decode(credentialResponse.credential));
                    await navigate("/dashboard",{state:{value:userid.current}});
                   
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  theme="filled_black"
                  shape="circle"
                  size="large"
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      {/* </form> */}
    </div>
  );
}

export default Signup;
