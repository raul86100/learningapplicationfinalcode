import React, { useEffect, useState } from "react";
import "./Aboutpage.css";
import Navbar from "../../../compontent/aboutpagecompontent/Aboutnavbar/navbar";
import Card from "../../../compontent/aboutpagecompontent/wiredcard/card";
import Theme from "../../../themefunction/Themefinding/theme";
import sample from "../../../imgaes/aboutimages/reading-book-illustration/6737457-removebg.png";
import data from "../../../checkinhdata/data"
import Quetioncard from "../../../compontent/aboutpagecompontent/quetioncard";

function Aboutpage() {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navstyle = {
    backgroundColor: "transparent",
  };
  const scrollnav = {
    backgroundColor: "#201e24",
    color: "white",
  };

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  return (
    <div className="ab">
      <Navbar style={scrollPosition > 0 ? scrollnav : navstyle} />
      <div className="little">
        <div className="leftlittle" style={Theme() ? {} : {}}>
          <img src={sample} width="100%" alt="" />
        </div>
        <div className="rightlittle">
          <p>Education is the key to all the locked doors of the unknown</p>
          <hr />
        </div>
      </div>

      <p className="trending">Trending Courses offered by BroCode</p>
      <div className="wholequestiodiv"> 
{data.map((item,index)=>(
      <div className="maincontent" key={index}>
        <Card cardcolor={Theme() ? "#201e24" : "white"} title={item.title}  description={item.describe} image={item.img}/>
        <Quetioncard question={item.question} answer={item.answer} />
     </div>))}
     </div>
    </div>
  );
}

export default Aboutpage;
