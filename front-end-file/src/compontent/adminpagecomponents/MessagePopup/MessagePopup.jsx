import React from "react";
import "./messagepopup.css";
import Button from "../../button/Button";
import { FcCheckmark } from "react-icons/fc";


function MessagePopUp() {
  return (
    <div className="broadcast-cont">
      <div className="message-box">
        <div className="message-cont">
          <div className="message-field">
            <label htmlFor={`field-8`} className="form-label">
              Type a message for Broadcasting
            </label>
            <textarea
              type="text"
              placeholder={`Enter your Message...`}
              className="message-input"
              id={`field-8`}
            />
            <Button IconName={FcCheckmark} ButtonName={'BroadCast'} backgroundColor={'white'}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePopUp;
