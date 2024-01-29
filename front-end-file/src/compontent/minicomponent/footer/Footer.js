import React from "react";
import "../footer/footer.css";
import { AiFillHome, AiFillMail, AiFillPhone } from "react-icons/ai";

export default function Footer() {
  return (
    <>
      <section className="footer-container">
        <div className="initial">
          <div className="text">
            <h2 className="texth2">BRO CODERS</h2>
            <p className="texth2">
              Empower your future through <br />
              our online learning platform,
              <br /> where education transcends <br />
              physical boundaries.
            </p>
          </div>
          <div className="contact">
            <h2>CONTACT US</h2>
            <div className="icons">
              <AiFillHome color="white" />
              <span>Bangalore</span>
            </div>
            <div className="icons">
              <AiFillMail color="white" />
              <span>abc@gmail.com</span>
            </div>
            <div className="icons">
              <AiFillPhone color="white" />
              <span>1234567890</span>
            </div>
          </div>
        </div>
        
      </section>
      <div className="last">
          <p className="lastp">Copyright © 2023 - All right reserved by BroCoders
            
          </p>
        </div>
    </>
  );
}
