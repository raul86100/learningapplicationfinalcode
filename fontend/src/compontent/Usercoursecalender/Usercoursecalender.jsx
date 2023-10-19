import React, { useEffect, useRef, useState } from "react";
import "./yourcourses.css";
import book from "../../imgaes/userimagesr/courseimg.svg"
import { Link, useNavigate } from "react-router-dom";


function Usercoursecalender(props) {
  const {active,compelted}=props;
 //const [accourse,setAccourse]=useState(active);
//  const rf=useRef(active);
const [comcheck,setComcheck]=useState(true);
  const navigate=useNavigate();
  const [selected, setSelected] = useState(true);
 useEffect(()=>{
if(selected === false){
  setComcheck(false) ;
}
else{
  setComcheck(true) ;
}
 },[selected])

  console.log(active,"active");
  console.log(compelted,"complted")
  
  const accourse= selected ? active :compelted;
 

  const handlechange=(courseid)=>{
    navigate("/dashboard/courseview",{ state:{ id:courseid,compeltedstaus:comcheck}});
  }

  return (
    <div className="dashboard">
      <div className="yourcourses">
        <div className="coursetext">
          <p className="yourcoursestext">Your courses</p>
        </div>
        <div className="types">
          <p
            onClick={() => {setSelected(!selected);}}
            className={!selected ? "typeslink":  "typeslinkactive" }
          >
            Active Courses
          </p>
          <p
            onClick={() =>{setSelected(!selected);}}
            className={
              selected ? "typeslink":  "typeslinkactive"
            }
          >
            Completed Courses
          </p>
        </div>

        {accourse.map((course,index) => {
          return (
            <div onClick={()=>{handlechange(course.courseId);}} className="courseitem" key={index}>
               
                <div className="course">
                  
                     <div><img src={book} className="courseimgm" width="100px"/> </div>
                  <div className="coursetext">
                    <p className="title">TITLE: {course.coursename}</p>
                    <p className="author">AUTHOR: {course.authorname}</p>
                  </div>
                </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Usercoursecalender;
