import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Usercourseview.css'
import admin from '../../../imgaes/Logo/download.jpeg'
import { api } from '../../../Constant/Api'
function Usercourseview() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api.baseurl+"/GetAdminmessage")
        console.log(response.data)
        setNotifications(response.data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='main'>
      <h1 className='heading'>User Notifications</h1>
      <div className='box'>
      <p style={{fontSize:30,textAlign:'center',marginBottom:10 ,fontWeight:400,color:'blue   '}}>Admin Messages</p>
      <ul className='all'>
        {notifications.map((message, index) => (
          <div className='mess' >
            <img className='image' src={admin} alt="ss" />
            
          <li key={index} className='notification-item'>{message.message}</li>

          </div>
        ))}
      </ul>
      </div>
     
    </div>
  )
}

export default Usercourseview
