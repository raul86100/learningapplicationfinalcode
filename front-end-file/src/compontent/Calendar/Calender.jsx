import React, { useState } from 'react'
import "./Calender.scss";


function Calender() {
   
const currentDate = new Date();

const[currentMonth,setCurrentMonth]=useState(currentDate.getMonth());


const currentYear = currentDate.getFullYear();
const Month=['January','February','March','April','May','June','July','August','September','Octember','November','December'];


// Create a function to generate a calendar for a specific month and year
function generateCalendar(month, year) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const calendar = [];

  // Fill in the days of the week for the header
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THE', 'FRI', 'SAT'];
  calendar.push(daysOfWeek);

  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const weekIndex = Math.floor((day + firstDayOfMonth.getDay() - 1) / 7);

    if (!calendar[weekIndex + 1]) {
      calendar[weekIndex + 1] = [];
    }

    calendar[weekIndex + 1][dayOfWeek] = day;
  }

  return calendar;
}


const calendar = generateCalendar(currentMonth, currentYear);
console.log(calendar);
//padding the zero in callender

function addToBeginning(arr, targetLength, valueToAdd) {
    const newArray = Array.from({ length: arr[1].length }, (_, index) => arr[1][index] !== undefined ? arr[1][index] : 0);
arr[1]=newArray;
  }

const maxLength = Math.max(...calendar.map(subarray =>7));

addToBeginning(calendar, maxLength, 0);



  return (

    <div className='callayout'>
      {/* { currentDate.getFullYear()}     <button onClick={()=>{setCurrentMonth(currentMonth-1)}}>Back</button>  <button onClick={()=>{setCurrentMonth(currentMonth+1)}}>Next</button> */}
        <span className='month_design'>{Month[currentMonth%12]}</span>
        <table><tbody>{calendar.map((item,index)=>(
        <tr key={index}>{item.map((date,ind)=>(<td key={ind} className={date === currentDate.getDate()? "today" :"futur"}>{date===0?" ":  date}</td>))}</tr>
    ))}</tbody></table></div>
  )
}

export default Calender