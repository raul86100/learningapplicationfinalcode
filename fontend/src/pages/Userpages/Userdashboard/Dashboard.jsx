import React from "react";
import './Dashboard.css'
import { Outlet, useLocation } from "react-router-dom";
import NavbarDashboard from "../../../compontent/Dashboardnavbar/NavbarDashboard";

function Dashboard() {
  //const location = useLocation();
//const userid=location.state.value;
 //const userid=2;
//console.log(userid,"mmuser");


  return (
    <div>
      <div className="dashboardnavi">
       <NavbarDashboard />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
