import React, { useEffect, useState } from "react";
import "./yourcourses.css";
import book from "../../imgaes/userimagesr/courseimg.svg";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
function Usercoursecalender(props) {
  const { active, compelted } = props;
  //const [accourse,setAccourse]=useState(active);
  //  const rf=useRef(active);
  const [comcheck, setComcheck] = useState(true);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(true);
  useEffect(() => {
    if (selected === false) {
      setComcheck(false);
    } else {
      setComcheck(true);
    }
  }, [selected]);

  console.log(active, "active");
  console.log(compelted, "complted");

  const accourse = selected ? active : compelted;

  const handlechange = (courseid) => {
    navigate("/dashboard/courseview", {
      state: { id: courseid, compeltedstaus: comcheck },
    });
  };

  return (
    <div className="dashboard">
      <div className="yourcourses">
        <div className="coursetext">
          <p className="yourcoursestext">My Courses</p>
        </div>
        <div className="types">
          <p
            onClick={() => {
              setSelected(!selected);
            }}
            className={!selected ? "typeslink" : "typeslinkactive"}
          >
            Active Courses
          </p>
          <p
            onClick={() => {
              setSelected(!selected);
            }}
            className={selected ? "typeslink" : "typeslinkactive"}
          >
            Completed Courses
          </p>
        </div>
<section className="overflow-class">
        {accourse.map((course, index) => {
          return (
            <div
              onClick={() => {
                handlechange(course.courseId);
              }}
              className="courseitem"
              key={index}
            >
              <div className="course">
                <div className="imgflex">
                  <img
                    src={book}
                    className="courseimgm"
                    width="100px"
                    alt="mxmx"
                  />{" "}
                
                <div className="coursetext">
                  <p className="title">{course.coursename}</p>
                  <p className="author">Author: {course.authorname}</p>
                </div></div>
                <FaArrowRightLong />
              </div>
            </div>
          );
        })}
        </section>
      </div>
    </div>
  );
}

export default Usercoursecalender;
