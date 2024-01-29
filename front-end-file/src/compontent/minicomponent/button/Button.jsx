import React from "react";
import "./button.css";
import { useNavigate } from "react-router-dom";


function Button({ url, ButtonName , backgroundColor,link}) {
  const navigate=useNavigate();
  const handleredirect=()=>{
  navigate(link);
  }
  return (
    <div className="buttonmy" style={{background:backgroundColor}} onClick={handleredirect}>
       <img src={ url} width="30px" alt="bumm"/>
      <div className="btnname">
        <p>{ButtonName}</p>
      </div>
    </div>
  );
}

export default Button;
