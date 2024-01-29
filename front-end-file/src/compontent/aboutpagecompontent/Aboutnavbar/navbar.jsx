import React from 'react'
import Aboutimages from "../../../imgaes/aboutimages/Aboutimages"
import Theme from '../../../themefunction/Themefinding/theme';
import "./navbar.css"
import { useNavigate } from 'react-router-dom';

function Navbar({style}) {
  const navigate=useNavigate()

  return (
    <div className='nav' style={style}>
        <img src={Theme() ? Aboutimages.Dlogo : Aboutimages.Llogo} alt='logo' width={Theme()?"100px" :"120px"}/>
        
        <ul className='list-flex'>
        {/* <li>Home</li>
        <li>Features</li> */}
        <li  className='onlinecode'>onlinecode++</li>
        <li className='con' onClick={()=>navigate("register")}>Signin</li></ul></div>
  )
}

export default Navbar