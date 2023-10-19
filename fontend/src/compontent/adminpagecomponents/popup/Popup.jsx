import React from 'react'
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import Button from '../../button/Button';
import './popup.css';

function Popup({name, handlePopUp, OnConfirm}) {
  return (
    <div className="popup-div">
    <div className="popup">
          <h2 style={{ color: "red" }}>ALERT!</h2>
          <h4>Are you sure you want to {name} this course?</h4>
          <div className="confirm-buttons">
            <Button
              IconName={FcCheckmark}
              ButtonName={"Yes"}
              backgroundColor={"#7ce31b"}
              onClick={OnConfirm}
            />

            <Button
              IconName={AiOutlineClose}
              ButtonName={"No"}
              backgroundColor={"#fc3903"}
              onClick={handlePopUp}
            />
          </div>
    </div>
    </div>
  )
}

export default Popup
