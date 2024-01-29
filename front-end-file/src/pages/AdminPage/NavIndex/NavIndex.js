import React, { useState } from "react";
import { IoReorderThreeSharp } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { AiFillCloseCircle } from "react-icons/ai";
import "./NavIndex.css";
import { useNavigate } from "react-router-dom";

export default function NavIndex() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handlesidenav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleAdmindashboard=()=>
  {
    navigate('/admin/');
  }
  const handleAdminMessages =()=>{
    navigate('/admin/message')
  }

  const handleAdminCourses =()=>{
      navigate('/admin/manage');
  }

  
  return (
    <div className={isNavOpen ? "sidenav activenav" : "sidenav"}>
      <div className="iconnametext">
      {isNavOpen ? (
        <AiFillCloseCircle size={52} color={"white"} onClick={handlesidenav} className="nicon"/>
      ) : (
        <IoReorderThreeSharp size={52} color={"white"} onClick={handlesidenav} className="nicon"/>
      )}
      </div>  

      <div className="nicons">
        <div className="iconnametext">
          <MdOutlineDashboardCustomize size={42} color={"white"} className="nicon" onClick={handleAdmindashboard} />
          
          {isNavOpen && <p onClick={handleAdmindashboard} style={{marginTop:50}}>Monitor</p>}
        </div>
        <div className="iconnametext">  
        <GiBookshelf size={42} className="nicon" color={"white"} onClick={handleAdminCourses}/>
        {isNavOpen && <p onClick={handleAdminCourses} style={{marginTop:50}}>Courses</p>}


        </div>  
        <div className="iconnametext">
        <TiMessages size={42} className="nicon" color={"white"} onClick={handleAdminMessages} />
        {isNavOpen && <p onClick={handleAdminMessages}style={{marginTop:50,marginLeft:3}}>Message</p>}

        </div>
      </div>
      {/* <div className="iconnametext">
        <AiOutlineLogout size={42} className="nicon"  color={"white"} onClick={handleLogout}/>

        {isNavOpen && <p onClick={handleLogout}style={{marginTop:50}} >Logout</p>}

        </div> */}

    </div>
  );
}
