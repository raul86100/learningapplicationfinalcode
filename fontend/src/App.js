//import logo from './logo.svg';
import './App.css';
//import Firstindex from './pages/Common-page/Firstindex/Firstindex';
import Aboutpage from './pages/Common-page/Aboutpage/Aboutpage';
//import Login from './pages/Common-page/Loginpage/Login';
import Signup from './pages/Common-page/Signuppage/Signup';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Userpages/Userdashboard/Dashboard';
import Userindex from './pages/Userpages/Userindex/Userindex';
import Explorecourse from './pages/Userpages/Explorecourse/Explorecouse';
import UserProfile from './pages/Userpages/UserProfile/UserProfile';
import Usercourseview from './pages/Userpages/Usercourseview/Usercourseview';
import Courseview from './pages/Userpages/Courseview/Courseview';
//import Usercarts from './pages/Userpages/Usercarts/Usercarts';
import AdminPage from './pages/AdminPage/AdminPage';
import ManageCourses from './pages/AdminPage/ManageCourses/ManageCourses';
import Message from './pages/AdminPage/MessagePage/Message';
import AdminDashboard from './pages/AdminPage/Dashboard/AdminDashboard';
import AddCourse from './pages/AdminPage/AddCourse/AddCourse';


function App() {
return(
  <Routes>
<Route path="/" element={<Aboutpage/>} />
          

<Route path="register" element={<Signup />} />
<Route path="/dashboard" element={<Dashboard/>}>
          <Route index element={<Userindex/>} />
          <Route path="explorecousre" element={<Explorecourse/>} />
          <Route path="profile" element={<UserProfile/>} />
          <Route path="course" element={<Usercourseview/>} />
          <Route path="courseview" element={<Courseview/>} />
          {/* <Route path="usercarts" element={<Usercarts />} /> */}
          
          
</Route>
<Route path="admin" element={<AdminPage/>}>
  <Route index element={<AdminDashboard />} />
  <Route path="manage" element={<ManageCourses/>} />
  <Route path="message" element={<Message/>} />
  <Route path="add" element={<AddCourse/>} />


</Route>









    
</Routes>
);
}

export default App;
