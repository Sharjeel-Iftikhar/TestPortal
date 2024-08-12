import React, { useState } from "react";

import CheckboxWithValidation from "./checkButton";

import {login} from "../../state/index";
import { useDispatch } from "react-redux";

import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../Header";


const AuthComponent = () => {

  const dispatch = useDispatch();

  const location = useLocation(); // Get the current location
  const navigate = useNavigate();

  const isSignUp = location.pathname === '/signup';

  // const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async ({formData}) => {
    try{
      console.log('Sign up data:', formData);
    const response =  await fetch('http://localhost:3000/exam/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*', // Required for CORS support to work
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      setFormData({ email: '', password: '' });
      navigate('/login');
    }
    }
    catch(err){
      console.log(err);
    }
    

  }


  const setlogin = async ({formData}) => {
    try{
      console.log('Sign in data:', formData);
    const response =  await fetch('http://localhost:3000/exam/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*', // Required for CORS support to work
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data.user);
    console.log(data.token);
    if (data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',JSON.stringify(data.user));
      dispatch(login({
        user: data.user,
        token: data.token,
      }));
      navigate('/');


    }
    }
    catch(err){
      console.log(err);
    }
    
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    if (isSignUp && !isChecked) {
      setShowError(true);
    } else {
      setShowError(false);
      if (isSignUp) {
        // Handle sign-up logic here
        register({formData});
        
      } else {
        // Handle sign-in logic here
        setlogin({formData});
      }
    }
  };

  return (
    <>
    <Header />
    <div className="flex flex-col items-center bg-gray-100 w-full mx-auto mb-[18px]">
      <div className={`${isSignUp ? 'pt-0 pr-6 pb-7 pl-6' : 'pt-0 pr-6 pb-7 pl-6 '} bg-white rounded-[6px] shadow-custom-light w-full max-w-[484px] mt-[48px]`}>
        <h1
          style={{ wordSpacing: '-2px' }}
          className="text-[1.375rem] leading-[1.5rem] tracking-normal font-bold pt-[28px] mt-0 mb-5 text-[#0f2830]">
          {isSignUp ? "Sign up" : "Sign in"}
        </h1>
        {isSignUp && <p className="mt-4 text-[1rem] text-[#505d6b] leading-6 mb-6">Just one more step to create your first test!</p>}
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm leading-5 font-normal tracking-normal text-custom-dark mb-2">
              {isSignUp ? 'Email address' : 'Enter your email '}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pt-3 pb-[14px] pl-[10px] pr-[10px]  h-[42px] overflow-visible px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-400 text-[1rem] leading-5 font-normal tracking-normal text-custom-dark"
            />
          </div>
          <div>
            <label className="block text-sm leading-5 font-normal tracking-normal text-custom-dark mb-2 mt-3">
              {isSignUp ? 'Password (min. 8 characters)' : 'Enter Password '}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pt-3 pb-[14px] pl-[10px] pr-[10px] mb-2  h-[42px] overflow-visible px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-400 text-[1rem] leading-5 font-normal tracking-normal text-custom-dark"
            />
          </div>

          {isSignUp && (
            <CheckboxWithValidation
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              showError={showError}
            />
          )}

          <button
            type="submit"
            className={`w-full ${isSignUp ? 'mt-[33px]' : 'mt-[15px]'} py-2 bg-custom-button-color text-white rounded hover:bg-green-600 transition duration-300`}

          >
            {isSignUp ? "Sign up" : "Sign In"}
          </button>

          <p
            className="text-center text-[12px] leading-5 font-bold tracking-normal mb-3 mt-6"
            style={{ color: "#505D6B" }}
          >
            OR
          </p>
          <button
            type="button"
            className={`${isSignUp ? 'h-[36px] pt-0 pb-0 pl-4 pr-4 ' : 'h-[43px]'} w-full py-2 flex items-center justify-center bg-white
             text-black rounded hover:text-green-600 hover:outline-none
              hover:border-green-400  transition duration-300 border border-gray-400  gap-3`}
          >
            <span className="flex-shrink-0 ml-[0.6rem]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22px" height="22px"><defs><linearGradient id="K7_evwOeO6UmBZr1zxGzda" x1="6" x2="22" y1="14" y2="14" data-name="Безымянный градиент 16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a" /><stop offset=".44" stop-color="#ee3d4a" /><stop offset="1" stop-color="#e52030" /></linearGradient><linearGradient id="K7_evwOeO6UmBZr1zxGzdb" x1="56.6" x2="23.63" y1="14" y2="14" data-name="Безымянный градиент 10" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64" /><stop offset="1" stop-color="#088242" /></linearGradient><linearGradient id="K7_evwOeO6UmBZr1zxGzdc" x1="48.68" x2="20.72" y1="34" y2="34" data-name="Безымянный градиент 11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fede00" /><stop offset="1" stop-color="#ffd000" /></linearGradient><linearGradient id="K7_evwOeO6UmBZr1zxGzdd" x1="6" x2="22" y1="34" y2="34" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0" /><stop offset="1" stop-color="#22a5e2" /></linearGradient></defs><path fill="url(#K7_evwOeO6UmBZr1zxGzda)" d="m22,22H6V6h16v16Z" /><path fill="url(#K7_evwOeO6UmBZr1zxGzdb)" d="m42,22h-16V6h16v16Z" /><path fill="url(#K7_evwOeO6UmBZr1zxGzdc)" d="m42,42h-16v-16h16v16Z" /><path fill="url(#K7_evwOeO6UmBZr1zxGzdd)" d="m22,42H6v-16h16v16Z" /></svg>
            </span>
            <span className={`${isSignUp ? 'leading-6' : 'flex-grow'}  text-center font-semibold leading-5`}>
              {isSignUp ? 'Sign up with Microsoft' : 'Continue with Microsoft'}

            </span>
          </button>
          {!isSignUp &&
            <>
              <hr className="divider" />
              <button
                type="button"
                onClick={() => navigate('/signup')}

                className="w-full mt-[5px] py-2 mb-3 bg-white  text-black rounded  hover:text-green-600 hover:outline-none hover:border-green-400  transition duration-300 border border-gray-300"
              >
                {isSignUp ? "" : "Sign up"}
              </button>
              {!isSignUp && (
                <p className="text-center text-base leading-6 text-[#808e9d] mt-3 font-aktiv-grotesk font-normal">
                  Forgot your password?
                </p>
              )}

            </>

          }







        </form>



      </div>
      {isSignUp && (
            <div className="flex-grow w-[484px]  bg-[#f8f9fb] border border-[#dfe6ed]" style={{ borderRadius: '0px 0px 6px 6px' }}>
              <div className="pr-6 pl-6 pb-7 pt-6">
                <p className="text-[1.125rem] font-bold leading-5 mb-[14px] text-[#014751]">Here to take a test?</p>
                <div className="">
                  <div className="">
                    <span className="text-sm text-gray-600">
                      <b>No need to sign up</b>. If you got lost, check our{' '}
                      <a
                        href="https://www.testportal.net/en/help-center/i-can-t-access-the-test-what-do-i-do/"
                        className="text-[#014751] underline"
                      >
                        Help Center
                      </a>.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
    </>
  );
};

export default AuthComponent;
