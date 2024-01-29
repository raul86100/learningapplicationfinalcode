import React, { useEffect, useRef, useState } from "react";
import logo from "../../../imgaes/Logo/studio learning.png"
import "./Explorecourse.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useRazorpay from "react-razorpay";
import Dashboardicon from "../../../imgaes/dashboard";
import Coursecard from "../../../compontent/coursecard/Coursecard";
//import Checkingdata from "../../../checkinhdata/explorecoursedata";
import Coursepopcard from "../../../compontent/Coursepopcard/Coursepopcard";
import Singlebutton from "../../../compontent/minicomponent/Single iconbutton/Singlebutton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loadingpage from "../../../compontent/Loadingpage/Loadingpage";
import { api } from "../../../Constant/Api";

function Explorecourse() {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    console.log("voicenotworking");
  }
  const [Razorpay] = useRazorpay();
  const amt=useRef(null);
  const endrolldata=useRef([])
  const paymentId=useRef(null);
  const navigate = useNavigate();
  const [voice, setVoice] = useState(false);
  const [popcheck, setPopcheck] = useState(false);
  const [allcourse, setAllcourse] = useState([]);
  const [popdetails, setPopdetails] = useState({});
  const [filter,setFilter]=useState("");
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
setFilter(transcript);
console.log(filter);

  },[transcript]);
  useEffect(() => {
    getcourse();
   
  }, []);
  const getcourse = async() => {
    await axios.get(api.baseurl+"/get",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }).then(function (response) {
      setAllcourse(response.data);
      
    }).catch((err)=>{navigate("/")});


    await axios.get(api.baseurl+"/courses/"+localStorage.getItem("Userid"),{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }).then(
      (res)=>{
        const array=[];
       res.data.courseEnrolled.forEach((obj) => {
          
          const modifiedObj = { ...obj.courseinfo};
          array.push(modifiedObj);
        });
        endrolldata.current=array;
        setLoading(false);
        
      }
     ).catch((err)=>{navigate("/")});
    
  };

  const mydata=allcourse.filter(item1=> !endrolldata.current.some(item2=> item1.courseId=== item2.courseId));
  
const payment= async(amount,courseid)=>{
  
  await axios.get(api.baseurl+"/transaction/"+amount,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  }).then(
    (res)=>{amt.current=res.data;
      console.log(amt.current);
    }
  ).catch((err)=>{navigate("/")});
  
  const options = {
    key: amt.current.key, // Enter the Key ID generated from the Dashboard
    amount: amt.current.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Skill Care Academy",
    description: "Testing Mode",
    image: logo,
    order_id: amt.current.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: async function (response)  {
      paymentId.current=response;
     await endroll(courseid);
  await navigate("/dashboard");

    },
    
    notes: {
      address: "Brocode learning platform",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();


 console.log(paymentId.current);


  // endroll(popdetails.courseId);
  // navigate("/dashboard");

  
  // endroll(popdetails.courseId);
  // navigate("/dashboard");





}




  const endroll = (courseid) => {
    // console.log(popdetails.price);
    //userid in the params
    axios
      .post(`${api.baseurl}/enroll?userid=${localStorage.getItem("Userid")}&courseId=${courseid}`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        }
      })
      .then(res =>{
        console.log('res');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handler = (lt) => {
    if (lt === true) {
      setVoice(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      setVoice(true);
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
  };

  const popcourse = (item) => {
    setPopdetails(item);

    setPopcheck(true);
  };
const micsty={
  padding:'5px',
  backroundcolor:'red'
}


  return (
    <div className="parentcoursediv">
      {loading && <Loadingpage/>}
      {popcheck && (
        <Coursepopcard
          Coursename={popdetails.coursename}
          Courseauthor={popdetails.authorname}
          Coursedescription={popdetails.coursedescription}
          courseprice={popdetails.price}
          close={()=>{
            setPopcheck(false);
          }}
          check={() => {
            setPopcheck(false);
            payment(popdetails.price,popdetails.courseId);
           
          }}
        />
      )}
      <div className="search">
        <div className="input">
           <input type="text" value={filter} onChange={(e)=>{
            setFilter(e.target.value);
            console.log(filter);
           
           }} placeholder="Search by course name"/> 
            <div
          onClick={() => {
            handler(voice);
          }}
        >
          {" "}
          <Singlebutton url={Dashboardicon.mi} style= {micsty}/>{" "}
        </div>
          
        </div>
       
      </div>

      <div className="coursegrid">
        {mydata
        .filter((user)=>{
          return filter.toLowerCase()===''? user :(user.coursename.toLowerCase()).includes(filter.toLowerCase());
      }).map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                popcourse(item);
              }}
              className="coursenp"
            >
              <Coursecard coursename={item.coursename} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Explorecourse;
