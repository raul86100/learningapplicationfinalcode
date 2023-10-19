import React from "react";
import "./intro.css";
import image5 from "../../../imgaes/sliderimages/aboutpage/image5.jpg";
import image6 from "../../../imgaes/sliderimages/aboutpage/image6.jpg";
import image7 from "../../../imgaes/sliderimages/aboutpage/image7.jpg";


function Intro() {
  return (
    <div>
      <div className="top">
        <h2>Here are more reasons</h2>
        <h1>Why choose BroCoders Learning couses?</h1>
      </div>
      <table className="introtable">
        <tr>
          <td className="introtd">
            <div
              className="rowimage"
              style={{ backgroundImage: `url(${image5})` }}
            ></div>
          </td>
          <td className="introtd">
            <div className="rowtext">
              <h2>Get Personalized Guidance</h2>
              <h3>Your Partner in Learning</h3>
            </div>
          </td>
        </tr>
        <tr>
          <td className="introtd">
            <div className="rowtext">
              <h2>Our Mission</h2>
              <h3>Making Education Accessible to All</h3>
            </div>
          </td>
          <td className="introtd">
            <div
              className="rowimage"
              style={{ backgroundImage: `url(${image6})` }}
            ></div>
          </td>
        </tr>
        <tr>
          <td className="introtd">
            <div
              className="rowimage"
              style={{ backgroundImage: `url(${image7})` }}
            ></div>
          </td>
          <td className="introtd">
            <div className="rowtext">
              <h2>Why Choose Us? </h2>
              <h3>A Trusted Online Learning Platform</h3>
            </div>
          </td>
        </tr>
      </table>

      {/* <div className="contactbox">
        <div className="contactboxtext">
          <h2>Learn Job ready skills from free<br /> online courses with <br/>certificates</h2>
        </div>
      </div> */}
    </div>
  );
}

export default Intro;
