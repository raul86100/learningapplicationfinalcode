import React from 'react'
import "./Login.css"
import image from "../../../imgaes/image"
function Login() {
  return (
    <div>
      <form>
    <div className='login_layout'>
     
      <div><img src={image.login}  width="400px" height="100%"/></div>
      <div className='login_form'>
      
        
        <p>Login</p>
        <div><input type='text' placeholder='Email' /></div>
        <div><input type='password' placeholder='password' /></div>
        <div><input type='submit' value="Login"/></div>
        
        </div>
       
      </div>
      </form>
      </div>
 
  )
}

export default Login