import React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { setName } from "../../state";
import { setQuiz } from "../../state";
import { useDispatch, useSelector } from "react-redux";

export default function TestStartForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
  });
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
  });

  const token = useSelector((state) => state.auth.token);
  
  const fetchQuizData = async () => {
  

    try {
      const response = await fetch("http://localhost:3000/exam/quiz", {
        
        headers: {
          "Content-Type": "application/json",
          
          'Authorization': `Bearer ${token}` // Add the Bearer token here
        },
      });
      const data = await response.json();
     
      console.log((data[0].questions));
      
      if (data) {
        
        console.log(
          'Quiz data fetched successfully',
        )
        dispatch(setQuiz({
          title: data[0].title,
          questions: data[0].questions
        }));
        navigate("/test");
      } else {
       
      }
    } catch (err) {
      console.log(err);
    } finally {
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setIsFocused({ ...isFocused, [field]: false });
    }
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    try {
      if (formData.FirstName && formData.LastName) {
           fetchQuizData(token)
        
        dispatch(setName({
          firstname: formData.FirstName,
          lastname: formData.LastName
        }));

       
        
     
       
        // Optionally reset the form data
        setFormData({ FirstName: '', LastName: '' });

        // 
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col flex-grow items-stretch basis-[50%]">
      <div className="test-card">
        <div className="text-[.75rem] leading-4 font-semibold tracking-wider uppercase text-[#0f2830] mt-[1px] ml-[4px]">
          Test start form
        </div>
        {/* body div */}
        <div className=" text-[1rem] font-normal leading-6 mt-[14px] mr-1 ml-1 mb-2">
          <div className="ml-0 mb-[14px]">Start the test</div>
          <div className="text-[1rem] font-normal leading-6 mt-[14px] mr-1 ml-1 mb-2">
            Fill in the form before starting the test.
          </div>

          <form className="container" onSubmit={handleSubmit}>
            <div className="w-full max-w-[460px] relative mt-8">
              <input
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                onFocus={() => handleFocus("firstName")}
                onBlur={() => handleBlur("firstName")}
                required
                className="w-full border-b-[1px] border-gray-400 focus:border-green-400 outline-none py-2 pl-0 pr-3 text-[1rem] leading-5 font-normal text-custom-dark transition duration-300"
              />
              <label
                htmlFor="FirstName"
                className={`absolute left-0 text-gray-500 transition-all duration-300 ${
                  isFocused.firstName || formData.FirstName
                    ? "top-[-20px] text-sm "
                    : "top-2"
                }`}
              >
                First name
              </label>
            </div>

            <div className="w-full max-w-[460px] relative mt-10">
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                onFocus={() => handleFocus("lastName")}
                onBlur={() => handleBlur("lastName")}
                required
                className="w-full border-b-[1px] border-gray-400 focus:border-green-400 outline-none py-2 pl-0 pr-3 text-[1rem] leading-5 font-normal text-custom-dark transition duration-300"
              />
              <label
                htmlFor="LastName"
                className={`absolute left-0 text-gray-500 transition-all duration-300 ${
                  isFocused.lastName || formData.LastName
                    ? "top-[-20px] text-sm "
                    : "top-2"
                }`}
              >
                Last name
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 h-[40px] px-[18px] font-bold bg-custom-button-color text-white rounded hover:bg-green-600 transition duration-300"
            >
              Start test
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
