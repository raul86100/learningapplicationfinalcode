import React, { useEffect, useState } from "react";
import "./ManageCourses.css";
import { AiOutlineSearch, AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "../../../compontent/adminpagecomponents/button/Button";
import { useNavigate } from "react-router-dom";
import Popup from "../../../compontent/adminpagecomponents/popup/Popup";
import axios from "axios";
import { api } from "../../../Constant/Api";

export default function ManageCourses() {
  const navigate = useNavigate();
  const [AllCourses, setAllCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [del, setDel] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (search === "") {
      getCourses();
    }
  }, [search]);

  const handlePopUp = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRedirect = () => {
    navigate("/admin/add", { state: [] });
  };

  const getCourses = async () => {
    try {
      const response = await axios.get(api.baseurl+"/get",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      const sortedCourses = response.data.sort(
        (a, b) => b.courseId - a.courseId
      );
      setAllCourses(sortedCourses);
    } catch (err) {
      navigate("/");
      console.log("Error:", err);
    }
  };

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
    const results = AllCourses.filter((course) => {
      return (
        course.coursename.includes(search) || course.authorname.includes(search)
      );
    });
    console.log("Results", results);
    setAllCourses(results);
  };

  const handleEdit = async (courseId) => {
    try {
      const response = await axios.get(
        `${api.baseurl}/Getcourse/${courseId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      navigate("/admin/add", { state: response.data });
    } catch (e) {
      navigate("/");
     // console.log(e, "error");
    }
  };

  const handleDelete = async (courseId) => {
    setIsPopupOpen(!isPopupOpen);
    setDel(courseId);
  };

  const OnConfirm = async () => {
    try {
      await axios.delete(`${api.baseurl}/DeleteCourse/${del}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setDel(0);
      
      handlePopUp();
      const response = await axios.get(api.baseurl+"/get",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setAllCourses(response.data);
    } catch (e) {
      navigate("/");
      //console.log(e, "error");
    }
  };

  return (
    <div className="manage-course-container">
    <div className="managecoursetext">
    <h1 >Manage Courses </h1>

    </div>
      <div className="admin-top">
        <div className="searchboxcontainer">
          <div className="inputbox">
            <input
              type="text"
              placeholder="Search Course"
              onChange={handleSearchInput}
            />
            <span className="search-icon">
              <AiOutlineSearch />
            </span>
          </div>
        </div>
        <Button
          IconName={AiFillEdit}
          ButtonName={"Add New Course"}
          backgroundColor={'DodgerBlue'}
          onClick={handleRedirect}
          className="button-3 "
        />
      </div>
      <div className="admin-course-container">
        <table className="table even">
          <thead>
            <tr className="course-row">
              {/* <th className="course-data">Course_Id</th>  */}
              <th className="course-data">Course_Name</th>
              <th className="course-data">Author_Name</th>
              <th className="course-data">Rating</th>
              <th className="course-data">Manage_Courses</th>
              </tr>
          </thead>
          <tbody>
            {AllCourses.map((course) => (
              <tr key={course.courseId} className="course-row">
                {
                /* <td className="course-data">{course.courseId}</td> */}
                <td className="course-data">{course.coursename}</td>
                <td className="course-data">{course.authorname}</td>
                <td className="course-data">{course.rating}</td>
                <td className="course-buttons">
                  <Button
                    IconName={AiFillEdit}
                    ButtonName={"Edit"}
                    backgroundColor={"Orange"}
                    className="btn1"
                    
                    onClick={() => handleEdit(course.courseId)}
                  />
                  <Button
                    IconName={AiFillDelete}
                    ButtonName={"Delete"}
                    backgroundColor={"Tomato"}
                    className="btn1"
                    onClick={() => {
                      handleDelete(course.courseId);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopupOpen && (
        <Popup
          name={"delete"}
          handlePopUp={handlePopUp}
          OnConfirm={OnConfirm}
        />
      )}
    </div>
  );
}
