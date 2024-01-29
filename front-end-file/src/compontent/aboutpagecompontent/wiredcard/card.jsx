import React from "react";
import "../wiredcard/card.css";
//import Aboutimages from "../../images/Aboutimages";

function Card({ cardcolor,title,description,image}) {


  return (
    <div className="wiredcard">
      <div className="imgflex">
        <div
          className="left"
          style={{ boxShadow: `15px -15px 0px 15px ${cardcolor}` }}
        ></div>
        <div className="imgview" style={{ backgroundColor: cardcolor }}>
          <img src={image} alt="ai" />
        </div>
        <div className="right" style={{ boxShadow:`-10px -10px 0px 10px ${cardcolor}`}} />
      </div>
      <h1>{title}</h1>
      <p>
        {description}
      </p>
    </div>
  );
}

export default Card;
