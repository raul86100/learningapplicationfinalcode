import React, { useState } from "react";
import "./lessons.css";


function Lessons({handleUnit}) {
  const labels = ["lessonName", "lessonDescription", "lessonLink"];
  const [lessonData, setLessonData] = useState({});
  const handleInputChange = (label) => (e) => {
    const val = e.target.value;
    setLessonData({
      ...lessonData,
      [label]: val,
    });
  };

  return (
    <div className="lessons-box">
      <form>
        {labels.map((l) => (
          <div className="lesson-row">
            <label>{l.charAt(0).toUpperCase() + l.slice(1)}:</label>
            {l === "lessonname" ? (
              <input
                className="lesson-input"
                type="text"
                id={l}
                value={lessonData[l]}
                onChange={handleInputChange(l)}
                required
              />
            ) : l === "lessondescription" ? (
              <textarea
                className="lesson-textarea"
                id={l}
                value={lessonData[l]}
                onChange={handleInputChange(l)}
                required
              />
            ) : (
              <input
                className="lesson-input"
                type="url"
                id={l}
                value={lessonData[l]}
                onChange={handleInputChange(l)}
                required
              />
            )}
          </div>
        ))}
      </form>
      <div className="done-btn">
        <button type="submit" onClick={()=>handleUnit(lessonData) }>Done</button>
      </div>
    </div>
  );
}

export default Lessons;
