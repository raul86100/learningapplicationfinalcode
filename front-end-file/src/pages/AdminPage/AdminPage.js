import React from "react";
//import { BsPersonCircle } from "react-icons/bs";
import "./adminpage.css";
import NavIndex from "./NavIndex/NavIndex";
//import ManageCourses from "./ManageCourses/ManageCourses";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="adminpagecontainer">
      <NavIndex />
      
      <Outlet />
        
      
    </div>
  );
}
