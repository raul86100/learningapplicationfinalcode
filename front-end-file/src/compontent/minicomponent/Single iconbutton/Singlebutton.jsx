import React, { useState } from "react";
import "./Singlebutton.css"

function Singlebutton({ url, style }) {
  const [btnstate,setBtnstate]=useState(false);
  return (
    <div style={style} className={btnstate? "actbtn":"btnicon"} onClick={()=>{setBtnstate(!btnstate)}}>
      <img src={url} width="20px" />
    </div>
  );
}

export default Singlebutton;
