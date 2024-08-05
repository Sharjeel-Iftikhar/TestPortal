import React, { useState } from "react";

const AuthComponent = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign-up logic here
      console.log("Sign up data:", formData);
    } else {
      // Handle sign-in logic here
      console.log("Sign in data:", formData);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 w-full mx-auto mb-[18px]">
      <div className="bg-white pt-0 pr-6 pb-7 pl-6 rounded-[6px] shadow-custom-light w-full max-w-[484px] mt-[48px]">
        <h1 className="text-2xl font-bold pt-[28px] mt-0 mb-5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm leading-5 font-normal tracking-normal text-custom-dark mb-2">
              Enter your email
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
              Enter Password
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
          <button
            type="submit"
            className="w-full mt-[15px] py-2 mb-3 bg-custom-button-color text-white rounded hover:bg-green-600 transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <p
            className="text-center text-[12px] leading-5 font-bold tracking-normal mb-3"
            style={{ color: "#505D6B" }}
          >
            OR
          </p>
          <button
            type="button"
            className="w-full py-2 flex items-center justify-center bg-white text-black rounded hover:text-green-600 hover:outline-none hover:border-green-400  transition duration-300 border border-gray-400"
          >
            <span className="flex-shrink-0 ml-[0.6rem]">
              <img
                className="h-[18px] w-[18px] object-contain"
                src="https://img.icons8.com/color/16/000000/microsoft.png"
                alt="Microsoft Logo"
              />
            </span>
            <span className="flex-grow text-center">
              Continue with Microsoft
            </span>
          </button>
          <hr className="divider" />

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-[5px] py-2 mb-3 bg-white  text-black rounded  hover:text-green-600 hover:outline-none hover:border-green-400  transition duration-300 border border-gray-500"
          >
            {isSignUp ? "Already have an account? Sign In" : "Sign Up"}
          </button>
          
          {!isSignUp && (
            <p className="text-center text-base leading-6 text-[#808e9d] mt-3">
              Forgot Password?
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;
