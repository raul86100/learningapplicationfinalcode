import React from 'react'
import './messagebox.css';

function Messagebox({message,time}) {
  return (
    <div className='m-cont'>
     <p className='messagetext'>{message}</p>
     <div>
     <p className='messagetext'>{time}</p>
     <p className='messagetext'>Delivered</p>
     </div>
    </div>
  )
}

export default Messagebox
