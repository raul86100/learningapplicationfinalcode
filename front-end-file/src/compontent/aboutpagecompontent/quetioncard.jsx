import React from 'react'
import './questioncard.css'

function Quetioncard({question,answer}) {
  return (
    <div className="questiondev">
          <p className="browser">{question}</p>

          {answer.map((item,index)=>(<p className="answerpara">{item.ans}</p>))
          }</div>
  )
}

export default Quetioncard