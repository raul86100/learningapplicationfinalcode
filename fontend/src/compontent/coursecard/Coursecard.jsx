import React from "react";
import "./Coursecard.css";
function Coursecard(props) {
  const { coursename, coursedetails, author } = props;
  return (
   
      <div className="coursecard">
        <div>
        <img
          src="https://d9jmtjs5r4cgq.cloudfront.net/images/general/Default+Course+Image-min.png"
          width="100%"
        className="courseimg"/></div>
        <div>
          <p className="cousename">
            {coursename} <span color="red">{author}</span>
          </p>

          <p className="coursedetails">{coursedetails}</p>
        </div>
      </div>
  
  );
}

export default Coursecard;
