import React from "react";
import "./Singlebutton.css"

function Singlebutton({ url, backcolor }) {
  return (
    <div style={{  }} className="btnicon">
      <img src={url} width="20px" />
    </div>
  );
}

export default Singlebutton;
