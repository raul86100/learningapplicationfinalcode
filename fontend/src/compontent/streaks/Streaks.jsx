import React, { useEffect, useRef } from "react";
import "./streaks.css";
import images from "../../imgaes/image"
import axios from "axios";
import streak from "../../imgaes/Logo/streak.png"

function Streaks(props) {
  const {active,complete}=props;
  const streakref=useRef(null);
  //const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(()=>{
    streakapi();
  },[])
  const streakapi=async()=>{
    await axios.get(`http://localhost:8000/GetLoginStreakforParticularUser/${localStorage.getItem("Userid")}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      }
    }).then(
     (res)=> {streakref.current=res.data;
        console.log(streakref.current);}
    )
  }
  return (
    <div className="streakcontainer">
      <div className="welcome">
        <img src={images.welcomeimg} className="userimg"></img>
        <div className="weldes">
          <p>Welcome User!</p>
          <p>Keep learning and keep growing.The best is yet to come.</p>
        </div>
      </div>

      <div className="count">
        <div className="activecount">
          <p className="activeclassheader">Active courses</p>
          <p>
            {active}
          </p>
        </div>

        <div className="completedcount">
          <p className="activeclassheader">Completed courses</p>
          <p>
            {complete}
          </p>
        </div>
      </div>
     
      <div className="streak">
        <p>Streaks</p>
        
        <div className="circle-container">
          <div><img src={streak}   width="100px"/> </div> <div className="streakcount"><p className="scount">{streakref.current}</p><div><p>day Streaks</p></div></div>    </div>
          <span>
          Consistency is the key to creating impressive streaks of
          accomplishment.
        </span>
      
      
      </div>
      
      
    </div>
  );
}

export default Streaks;
