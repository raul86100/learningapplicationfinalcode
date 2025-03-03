import React, { useEffect, useRef, useState } from "react";
import "./Userindex.css";
import Piechart from "../../../compontent/piechart/Piechart";
import Usercoursecalender from "../../../compontent/Usercoursecalender/Usercoursecalender";
import Courses from "../../../compontent/Usercoursecalender/yourcoursesdata";
import Streaks from "../../../compontent/streaks/Streaks";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Loadingpage from "../../../compontent/Loadingpage/Loadingpage";
import Calender from "../../../compontent/Calendar/Calender";
import { api } from "../../../Constant/Api";

function Userindex() {
  const navigate=useNavigate();
  localStorage.getItem("Userid");
  const coursedata1 = useRef([]);
  const coursedata2 = useRef([]);
  const [ballon, setBallon] = useState(true);
  
useEffect(()=>{
  apifetchcourse();
},[]);
  // useEffect(() => {
    

  //   const timer = setTimeout(() => {
  //     setBallon(false);
      
  //     console.log("pop");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const apifetchcourse = async () => {
    console.log("fetched");
    await axios
      .get(`${api.baseurl}/courses/${localStorage.getItem("Userid")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        }
      })
      .then((res) => {
        const array = [];
        res.data.courseEnrolled.forEach((obj) => {
          const modifiedObj = { ...obj.courseinfo };
          array.push(modifiedObj);
        });
        coursedata1.current = array;
        
      }).catch((err)=>{navigate("/")});
      console.log(coursedata1.current,"Sucess");
    await axios
      .get(
        api.baseurl+"/Coursecompleted/" +
          localStorage.getItem("Userid"),{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
          })
      .then((res) => {
        console.log(res.data, "completed");
        coursedata2.current=res.data;
      }).catch((err)=>{navigate("/")});

    console.log(coursedata2.current, "nnnnnn");

    setBallon(false);
    
  };

  
  const activecourse = coursedata1.current.filter(
    (item1) => !coursedata2.current.some((item2) => item1.courseId === item2.courseId)
  );
  const completed = coursedata1.current.filter((item1) =>
    coursedata2.current.some((item2) => item1.courseId === item2.courseId)
  );

  const dataobj = {
    labels: ["ongoing", "completed"],
    datasets: [
      {
        label: "Status",
        data: [
          coursedata1.current.length - coursedata2.current.length,
          coursedata2.current.length,
        ],
        backgroundColor: ["#3c998c", "#781282"],
        borderColor: ["#3c998c", "#781282"],
      },
    ],
  };

  

  return (
    <div className="userpan">
      
     {ballon && (
        <Loadingpage />
      )}

      <div className="indexpage">
        <div className="colum1">
          <Calender />
          <Piechart dataobj={dataobj} />
        </div>
        <div className="colum2">
          <Usercoursecalender active={activecourse} compelted={completed} />
        </div>
        <div className="colum3">
          <Streaks
            coursedata={Courses}
            active={coursedata1.current.length - coursedata2.current.length}
            complete={coursedata2.current.length}
          />
        </div>
      </div>
    </div>
  );
}

export default Userindex;
