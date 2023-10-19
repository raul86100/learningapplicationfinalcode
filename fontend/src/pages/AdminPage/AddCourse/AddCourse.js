import React, { useState, useEffect } from "react";
import "./AddCourse.css";
import Popup from "../../../compontent/adminpagecomponents/popup/Popup";
import axios, { formToJSON } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AddCourse() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const fields = [
    "coursename",
    "authorname",
    "difficultylevel",
    "rating",
    "price",
    "language",
    "duration",
    "link",
    "coursedescription",
    
  ];

  const initialFormState = {};

  const [formData, setFormData] = useState(initialFormState);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const updatedFormState = {};

    fields.forEach((field) => {
      updatedFormState[field] = data[field] || "";
    });

    setFormData(updatedFormState);
  }, []);

  const handlePopUp = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log(formData);
  };

  const OnConfirm =async () => {
    if (data.length === 0) {
      try{
        console.log(formData);
        const response= await axios.post("http://localhost:8000/Adminposting", formData,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        });
        handlePopUp();
        console.log(response.data);
        navigate('/admin/manage');  
      }
      catch(e){
        console.log(e,"error");
      }

    }
    else{
      try{
        axios.put(`http://localhost:8000/EditCourse/${data.courseId}`,formData,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        });
        handlePopUp();
        navigate('/admin/manage');
      }
      catch(e){
        console.log(e,"error")
      }
    }


  };

  const handleInputChange = (event, field) => {
    setFormData({ ...formData, [field]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handlePopUp();
  };

  return (
    <div className="addcourse-page">
      <form onSubmit={handleSubmit}>
        <div className="add-form">
        <h1 className="addcourse-text">ADD A NEW COURSE</h1>
            {fields.map((field, index) => (
              <div className="form-field" key={index}>
                <label htmlFor={`field-${index}`} className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "coursedescription" ? (
                  <textarea
                  type="text"
                  placeholder={`Enter your ${field}`}
                  className="form-input"
                  value={formData[field]}
                  id={`field-${index}`}
                  onChange={(event) => handleInputChange(event, field)}
                  required
                />
                  
                ):(
                  <input
                    type={field==="Link" ? "url":"text"}
                    placeholder={`Enter your ${field}`}
                    className="form-input"
                    id={`field-${index}`}
                    value={formData[field]}
                    onChange={(event) => handleInputChange(event, field)}
                    required
                  />
                )}
                
              </div>
            ))}

            <div className="submitbtn">
              <button type="submit" className="button-3">Submit</button>
            </div>
          
        </div>

        {isPopupOpen && (
          <Popup
            name={"Publish"}
            handlePopUp={handlePopUp}
            OnConfirm={OnConfirm}
          />
        )}
      </form>
    </div>
  );
}

export default AddCourse;
