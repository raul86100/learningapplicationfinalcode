import React from 'react'
import "./Iconbutton.css"
function Iconbutton(props) {
const {icon,names,color}=props;
  return (
    <div className='iconbutton' style={{ backgroundColor:color}}><div><img src={icon}/></div><div>{names}</div></div>
  )
}

export default Iconbutton