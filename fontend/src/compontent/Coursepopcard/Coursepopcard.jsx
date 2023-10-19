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
              <div>
                <p className="coursedescript">
                  <span>Description :</span>
                  {Coursedescription}
                </p>
              </div>
            </div>
          </div>
          <div className="endrollpop_describtion" onClick={check}><Iconbutton names={"Pay Rs-"+courseprice+" to Endroll"} color="#f7e852"/></div>
        </div>
      </div>
    </div>
  );
}

export default Coursepopcard;
