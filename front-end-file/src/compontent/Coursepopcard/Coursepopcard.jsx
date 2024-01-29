import React from "react";
import "./Coursepopcard.css";
import Iconbutton from "../icon-button/Iconbutton";
//import Button from "../minicomponent/button/Button";
function Coursepopcard(props) {
  const { Coursename, Courseauthor, Coursedescription ,check,courseprice,close} = props;
  console.log(courseprice);
  return (
    <div className="zindexpop" onClick={close}>
      <div className="backdrop">
        <div className="endrollcard">
          <div className="endrollpop_header">
            <div width="50%">
              <img
                src="https://d9jmtjs5r4cgq.cloudfront.net/images/general/Default+Course+Image-min.png"
                width="100%"
                className="courseimg"
                alt="couimg"
              />
            </div>
            <div className="sideimformation">
              <div>
                <p className="coursename">{Coursename}</p>
              </div>
              <div>
                <p className="courseAuther">
                  <span>Authourby :</span>
                  {Courseauthor}
                </p>
              </div>
              <span>Description :</span>
              <div className="codes">
                <p className="coursedescript">{Coursedescription}
                </p>
              </div>
            </div>
          </div>
          <div className="endrollpop_describtion" onClick={check}><Iconbutton names={"Pay Rs-"+courseprice+" to Endroll"} color="cornflowerblue" fontcolor="white"/></div>
        </div>
      </div>
    </div>
  );
}

export default Coursepopcard;
