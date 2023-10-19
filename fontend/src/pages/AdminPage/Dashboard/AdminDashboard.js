import React, { useEffect, useRef, useState } from 'react';
import './AdminDashboard.css';
import logo from '../../../imgaes/adminpageimages/logo.png';
import users from '../../../imgaes/adminpageimages/usercourse.png';
import enroll from '../../../imgaes/adminpageimages/enroll.png';
import courses from '../../../imgaes/adminpageimages/courses.png';
import { BsPersonCircle } from 'react-icons/bs';
import Analysis from '../../../compontent/adminpagecomponents/analysis/Analysis';
import axios from 'axios';
import user from '../../../imgaes/adminpageimages/user.png';
import edit from '../../../imgaes/adminpageimages/edit.png';
import settings from '../../../imgaes/adminpageimages/settings.png';
import help from '../../../imgaes/adminpageimages/question.png';
import logout from '../../../imgaes/adminpageimages/log-out.png';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [counts, setCounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/GetCount',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        });
        console.log(response.data);
        setCounts(response.data);
      } catch (err) {
        navigate("/");
        //console.log('Error', err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    console.log('Logging out...'); // Add this line for debugging
    navigate('/'); // Navigate to the root URL (or the desired URL after logout)
    localStorage.removeItem("AdminToken");
  };

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div className="admindashboard">
      <div className="adminheader">
        <img src={logo} className="brocode-logo" alt="logo" />
        <h1 className="dashboard-text" style={{ marginRight: 50 }}>
          DASHBOARD
        </h1>

        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <div className="App">
            <div className="menu-container" ref={menuRef}>
              <div className="menu-trigger" onClick={() => setOpen(!open)}>
                <img src={user} alt="user-icon" />
              </div>
              <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <h3>Admin</h3>
                <ul>
                  <DropdownItem img={user} text="My Profile" />
                  <DropdownItem img={edit} text="Edit Profile" />
                  <DropdownItem img={settings} text="Settings" />
                  <DropdownItem img={help} text="Helps" />
                  <DropdownItem img={logout} text="Logout" onClick={handleLogout} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="analysis">
        <Analysis img={users} count={counts.userCount} name="Users" />
        <Analysis img={courses} count={counts.courseCount} name="Courses" />
        <Analysis img={enroll} count={counts.enrollmentCount} name="Enrollment" />
      </div>
    </div>
  );
}

function DropdownItem(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <li className="dropdownItem" onClick={handleClick}>
      <img src={props.img} alt="dropdown-icon" />
      <a> {props.text} </a>
    </li>
  );
}

export default AdminDashboard;
