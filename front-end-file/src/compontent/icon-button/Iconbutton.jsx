import React, { useState } from 'react'
import "./Iconbutton.css"
function Iconbutton(props) {
  const [colour,setColour]=useState(false)
const {icon,names,color,fontcolor}=props;
  return (
    <div className='iconbutton' style={{ backgroundColor:colour?"black":color,color:fontcolor}} onMouseEnter={()=>{setColour(!colour)}} onMouseLeave={()=>{setColour(!colour)}}><div ><img src={icon} />{names}</div></div>
  )
}

export default Iconbutton