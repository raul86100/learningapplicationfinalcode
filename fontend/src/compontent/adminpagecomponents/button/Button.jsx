import React, { useState } from "react";
import "./button.css";

function Button({ IconName, ButtonName , backgroundColor, onClick}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className={isHovered ? "button activebtn":"button"} style={{background:backgroundColor}} onMouseOver={() => setIsHovered(true)}
    onMouseOut={() => setIsHovered(false)} onClick={handleClick} >
      <IconName color="black" />
      <div className="btnname">
        <p className="btnnamep">{ButtonName}</p>
      </div>
    </div>
  );
}

export default Button;
