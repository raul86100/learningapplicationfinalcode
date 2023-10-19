import React, { useState } from "react";
import Lessons from "../../../components/adminpagecomponents/lessons/lessons";
import "./lessonpage.css";
import Button from "../../../components/button/Button";
import { SiAddthis } from "react-icons/si";
import { FcCheckmark } from "react-icons/fc";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function LessonPage() {
  const navigate = useNavigate();
 const location = useLocation();
 const Id = location.state;


  const [data, setData] = useState([{}]);

  const handleUnit = (lesson) => {
    setData((prevData) => ({
      ...prevData,
      ...lesson
    }));
  };
  const [lessonComponents, setLessonComponents] = useState([
    <Lessons handleUnit={handleUnit} />,
  ]);

  const handleAddLesson = () => {
    setLessonComponents((prevComponents) => [
      ...prevComponents,
      <Lessons handleUnit={handleUnit} />,
    ]);
  };

  const handlelessonsubmit = async () => {
    try 
    {
      console.log("Data",data);
      console.log(Id);
      const response= await axios.post(`http://localhost:8000/Lesson/${Id}`,data);
      console.log("Response:",response);
      navigate("/admin/manage");
    } 
    catch (e) {
      console.log("Error Message:", e);
    }
  };

  return (
    <div className="lessonpage-container">
      <div className="add-lesson">
        <Button
          IconName={SiAddthis}
          ButtonName={"Add Lesson"}
          backgroundColor={"white"}
          onClick={handleAddLesson}
        />
      </div>
      <div class="lesson-container">
        {lessonComponents.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </div>

      <div className="lesson-submit">
        <Button
          IconName={FcCheckmark}
          ButtonName={"Submit"}
          backgroundColor={"white"}
          onClick={handlelessonsubmit}
        />
      </div>
    </div>
  );
}

export default LessonPage;