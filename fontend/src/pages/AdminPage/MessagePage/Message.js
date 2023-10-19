import React, { useState, useEffect } from "react";
import "./message.css";
import Messagebox from "../../../compontent/adminpagecomponents/Message/Messagebox";
import Popup from "../../../compontent/adminpagecomponents/popup/Popup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { FcCheckmark } from "react-icons/fc";

function Message() {
  const [isvisible, setIsvisible] = useState(false);
  const [message, setMessage] = useState({ message: "" });
  const [MessageData, SetMessageData] = useState([]);
  const navigate=useNavigate();

  const getMessages = async () => {
    try
    {
      const response = await axios.get("http://localhost:8000/GetAdminmessage");
      const sortedmessage = response.data.sort((a,b) => b.messageId - a.messageId);
      SetMessageData(sortedmessage);
    }catch(e)
    {
      navigate("/");
      //console.log("Error:",e);
    }
   // axios.get("http://localhost:8000/GetAdminmessage").then((response)=> console.log("getmess")).catch((err)=> console.log(err));
  };
  useEffect(() => {
    getMessages();
  }, []);

  const handlePopUp = () => {
    setIsvisible(!isvisible);
  };

  const handlemessage = (e) => {
    setMessage({ message: e.target.value });
  };
  const handleSend = async () => {
    try {
      await axios.post("http://localhost:8000/AdminPostMessage", message,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setMessage({ message: "" });
      getMessages();
    } catch (e) {
      navigate("/");
      //console.log("Error:", e);
    }
  };
  return (
    <div className="messagepage">
      <div className="previous-messages-container">
        <p className="prev-txt">Previous Messages</p>
        <div className="previous-messages">
          {MessageData.map((messageObj, index) => (
            <Messagebox
              key={index}
              message={messageObj.message}
              // time={messageObj.time}
            />
          ))}
        </div>
      </div>
      <div className="broadcast">
        <textarea
          type="text"
          placeholder="Type a message"
          className="message-input"
          value={message.message}
          onChange={handlemessage}
        ></textarea>
        <button onClick={handleSend} className="button-3">
          Send
        </button>
      </div>
      {isvisible && <Popup name={"send"} handlePopUp={handlePopUp} />}
    </div>
  );
}

export default Message;
