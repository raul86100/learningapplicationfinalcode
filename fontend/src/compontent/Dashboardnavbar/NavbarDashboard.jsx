import React, { useState } from "react";
import "./NavbarDashboard.css";
import logo from "../../imgaes/Logo/studio learning.png";
import Button from "../minicomponent/button/Button";
import Dashboardicon from "../../imgaes/dashboard";
import { useNavigate } from "react-router-dom";

function NavbarDashboard() {
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="dashboardnav">
        <div className="imgdashboard">
          <div
            className="imgdiv"
            onClick={() => {
              localStorage.removeItem("Token");
              navigate("/");
            }}
          >
            <img src={logo} width="100px" />
          </div>

          <div className="buttondash">
            <div>
              <Button
                ButtonName="Dashboard"
                link="/dashboard"
                url={Dashboardicon.dashboard}
              />
            </div>
            <div>
              <Button
                ButtonName="Explorecourse"
                link="/dashboard/explorecousre"
                url={Dashboardicon.course}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="navtext">let learn</p>
        </div>
        <div className="rightsideview">
          <div>
            <Button
            link="/dashboard/course"
            url={Dashboardicon.card}
            
          />
          </div>
          <div onMouseEnter={() => setDrawer(true)}>
            <Button
              ButtonName=""
              // link="/dashboard/explorecousre"
              url={Dashboardicon.profile}
            />
            {drawer && (
              <div className="dropdown" onMouseLeave={() => setDrawer(false)}>
                <div>Name :{localStorage.getItem("username")}</div>
                <div
                  className="logout"
                  onClick={() => {
                    localStorage.removeItem("Token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("Userid");
                    navigate("/");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarDashboard;
