import React, { useEffect, useState ,useRef,useCallback} from "react";
import "./Courseview.css";
import ReactPlayer from "react-player/lazy";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import completedgif from "../../../imgaes/completion.gif";
import { api } from "../../../Constant/Api";
import Loadingpage from "../../../compontent/Loadingpage/Loadingpage";
import Game from '../../../Game/Game'
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js'
import json from '../../../face_expression_model-weights_manifest.json'
const loadingdata=async()=>{
  try {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models') // Add model for expression recognition
    ]);
    console.log('Models loaded successfully!');
  } catch (error) {
    console.error('Error loading models:', error);
  }
}

function Courseview() {
  const [lo, setlo] = useState(true);
  useEffect(async() => {
   await axios
      .get(api.baseurl + "/Getcourse/" + courseId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        setlo(false);
        setSingleccourse(res.data);
      })
      .catch((err) => {
        navigate("/");
      });

      loadingdata().then(()=>{loadingjson()});
 setInterval(() => {
       capture();
       console.log("captured")
      }, 1000);
return ()=> clearInterval();

  }, []);





  // const destroy=(id)=>{
  //   console.log("cleared");
  //   clearInterval(id)
  // }
  const [singlecourse, setSingleccourse] = useState({});
  const [gif, setGif] = useState(false);

  const [expressions, setExpressions] = useState(null)
  const [game,setGame]=useState(false)


  const loadingjson=async()=>{
    try {
     
      const expressions = json;
      setExpressions(expressions);
      console.log('Expressions loaded from JSON!');
    } catch (error) {
      console.error('Error loading expressions:', error);
    }
  }

  const webref = useRef(null);
  

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const capture = async() => {
    if(location.pathname === '/dashboard/courseview'){

      try{
    const imageSrc = webref.current.getScreenshot();
    // console.log(imageSrc);
    const input=await faceapi.fetchImage(imageSrc);
    const detectionsWithExpressions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceExpressions()
if(detectionsWithExpressions[0].expressions.sad < 5.00000000){
  console.log(detectionsWithExpressions[0].expressions.sad,"sad")

  console.log(true);
  setGame(true)

}
}catch (error){
  console.log("not detected");
}}
  };







  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state.id;
  const check = location.state.compeltedstaus;
  console.log("courseid", courseId);

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
    <div className="videoviewer">

{
  game && <Game />
}





      <div className="face">
        
        <Webcam
          ref={webref}
          screenshotFormat="image/jpeg"
          audio={false}
          videoConstraints={videoConstraints}
          mirrored
        /></div>
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
        <span>{singlecourse.coursedescription}</span>
      </div>
    </div>
  );
}

export default Courseview;
