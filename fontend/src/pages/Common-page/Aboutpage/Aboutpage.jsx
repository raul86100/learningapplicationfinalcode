import React, { useState, useEffect } from 'react';
import './Aboutpage.css';
import introvideo from '../../../imgaes/introvideo.mp4';
import logo from '../../../imgaes/logo-final-final.png';
import { useNavigate } from 'react-router-dom';

function TypewriterText({ text }) {
  
 const [displayText, setDisplayText] = useState('');
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
 const typingInterval = 100; // Adjust the typing speed (in milliseconds)

 if (currentIndex < text.length) {
 const timer = setTimeout(() => {
 setDisplayText(text.slice(0, currentIndex + 1));
 setCurrentIndex(currentIndex + 1);
 }, typingInterval);

 return () => clearTimeout(timer);
 }
 }, [text, currentIndex]);

 return <h1 className="typewriter-text">{displayText}</h1>;
}

function Aboutpage() {
  const navigate=useNavigate();
 return (
 <div className="about-page-container">
 <div className="slidiv">
 <div className="video-container  av">
 <video src={introvideo} alt="intro" autoPlay loop muted ></video>
 </div>
 <div className="video-overlay">
 <img src={logo} alt="logo" className="logo" />
 <button className="signup-button" onClick={()=>navigate("register")}>Signin</button>
 <TypewriterText text="Grow in your life by learning in ours!" />
 </div>
 </div>
 </div>
 );
}

export default Aboutpage;