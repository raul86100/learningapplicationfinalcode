import React from 'react'
import './analysis.css'

function Analysis({img,count,name,bgcolor}) {
  return (
    <div className="analysis-box" style={{background:bgcolor}}>
      <img src={img} className='analysis-img'/>
      <p className='analysis-text1'>{count}</p>
      <p className='analysis-text2'>{name}</p>
    </div>
  )
}

export default Analysis
