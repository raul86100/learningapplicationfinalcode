import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Courseview.css";
import ReactPlayer from "react-player/lazy";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import completedgif from "../../../imgaes/completion.gif";
import { api } from "../../../Constant/Api";
import Loadingpage from "../../../compontent/Loadingpage/Loadingpage";
import Game from "../../../Game/Game";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import json from "../../../face_expression_model-weights_manifest.json";
import { cleanup } from "@testing-library/react";
const loadingdata = async () => {
  try {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"), // Add model for expression recognition
    ]);
    console.log("Models loaded successfully!");
  } catch (error) {
    console.error("Error loading models:", error);
  }
};


function Courseview() {
  const navigate = useNavigate();
  const [lo, setlo] = useState(true);
  const location = useLocation();
  const courseId = location.state.id;
  const check = location.state.compeltedstaus;
  console.log("courseid", courseId);
  // useEffect(async () => {
  //   await axios
  //     .get(api.baseurl + "/Getcourse/" + courseId, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       setlo(false);
  //       setSingleccourse(res.data);
  //     })
  //     .catch((err) => {
  //       navigate("/");
  //     });

  //   await loadingdata().then(() => {
  //     loadingjson();
  //   });
  //   capture();
  //   // const testdata = await setInterval(() => {
  //   //   capture();
  //   //   console.log("captured");
  //   // }, 10000);
  //   // return () => myclear(testdata);
  // }, []);

  // const myclear=(id)=>{
  // //   console.log("cleared");
  // //   clearInterval(id)

  // // }


  const fetchData = async (intervalId) => {
    try {
      // Fetch course data
      const res = await axios.get(api.baseurl + "/Getcourse/" + courseId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setlo(false);
      setSingleccourse(res.data);

      // Load face detection models
      await loadingdata();
      loadingjson();

      // Start capturing every 10 seconds
      intervalId = setInterval(() => {
        capture();
      }, 10000);
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    }
  };
  useEffect(() => {
    let intervalId;
  
    
  
    fetchData(intervalId);
  
    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [ navigate]);
  
  const [singlecourse, setSingleccourse] = useState({});
  const [gif, setGif] = useState(false);

  const [expressions, setExpressions] = useState(null);
  const [game, setGame] = useState(false);

  const loadingjson = async () => {
    try {
      const expressions = json;
      setExpressions(expressions);
      console.log("Expressions loaded from JSON!");
    } catch (error) {
      console.error("Error loading expressions:", error);
    }
  };

  const webref = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const capture =  async() => {
    // setInterval(async()=>{
    if (location.pathname === "/dashboard/courseview") {
      try {
        const imageSrc = webref.current.getScreenshot();
        // console.log(imageSrc);
        const input = await faceapi.fetchImage(imageSrc);
        const detectionsWithExpressions = await faceapi
          .detectAllFaces(input)
          .withFaceLandmarks()
          .withFaceExpressions();

           console.log(detectionsWithExpressions[0].expressions, "sad");
          var temp=parseInt(detectionsWithExpressions[0].expressions.fearful.toString().slice(0,1));
          // console.log(temp,"temp")
        if ( temp> 4.00) {
         
          console.log(detectionsWithExpressions[0].expressions.fearful, "loopsad");

          console.log(true);
          setGame(true);
        }
      } catch (error) {
        console.log("not detected");
      }
    }
  // },10000)


// return clearInterval;
  };
 

  
  

  // console.log(check, "ragul");
  console.log(singlecourse, "rara");

  const completeapicall = () => {
    setTimeout(() => {
      axios
        .post(
          `${api.baseurl}/CourseCompletion?userid=${localStorage.getItem(
            "Userid"
          )}&courseId=${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        )
        .then((res) => console.log("completed inserted in backend"))
        .catch((err) => {
          navigate("/");
        });

      navigate("/dashboard");
    }, 10000);
    clearTimeout();
  };


  return (
    <>
      {game && <div className="gameclass"><Game closefun={()=> setGame(false)}/></div>}
    <div className="videoviewer">
    

      <div className="face">
        <Webcam
          ref={webref}
          screenshotFormat="image/jpeg"
          audio={false}
          videoConstraints={videoConstraints}
          mirrored
        />
      </div>
      {lo && <Loadingpage />}
      {gif && (
        <div className="gif">
          <img src={completedgif} />{" "}
        </div>
      )}
      <div className="videocour">
        <section>
          <ReactPlayer
            url={singlecourse.link}
            onEnded={() => {
              if (check !== false) {
                setGif(true);

                completeapicall();
              }
            }}
            playing={!game}
            controls={true}
            width="100%"
            height="70vh"
            pip={true}
          />
        </section>
      </div>
      <div className="descriptionvideo">
        <span className="sum">CON : {singlecourse.coursename}</span>
        <span>CID : {singlecourse.courseId}</span>
        <span>Mentor : {singlecourse.authorname}</span>
        <span>Duration : {singlecourse.duration}</span>
        <span>Level : {singlecourse.difficultylevel}</span>
        <span>Language : {singlecourse.language}</span>
        <span>Course Abstract : </span>
        <span className="desclass">{singlecourse.coursedescription}</span>
      </div>
    
    </div>
    </>
  );
}

export default Courseview;
