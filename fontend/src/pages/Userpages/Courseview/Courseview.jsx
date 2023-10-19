import React, { useEffect, useState } from "react";
import "./Courseview.css";
import ReactPlayer from "react-player/youtube";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import completedgif from "../../../imgaes/completion.gif";
function Courseview() {
  const [singlecourse, setSingleccourse] = useState({});
  const [gif, setGif] = useState(false);
  //const [completecheck,setCompletecheck]=useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state.id;
  const check = location.state.compeltedstaus;
  console.log("courseid", courseId);
  useEffect(() => {
    axios
      .get("http://localhost:8000/Getcourse/" + courseId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        setSingleccourse(res.data);
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);

  console.log(check, "ragul");

  const completeapicall = () => {
    setTimeout(() => {
      axios
        .post(
          `http://localhost:8000/CourseCompletion?userid=${localStorage.getItem(
            "Userid"
          )}&courseId=${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        )
        .then((res) => console.log("completed inserted in backend")).catch((err)=>{navigate("/")});

      navigate("/dashboard");
    }, 5000);
    clearTimeout();
  };

  return (
    <div>
      {gif && (
        <div className="gif">
          <img src={completedgif} />{" "}
        </div>
      )}
      <div className="videocour">
        <ReactPlayer
          url={singlecourse.link}
          onEnded={() => {
            if (check !== false) {
              setGif(true);

              completeapicall();
            }
          }}
          controls={false}
          width="100%"
          className="player"
        />
      </div>
    </div>
  );
}

export default Courseview;
