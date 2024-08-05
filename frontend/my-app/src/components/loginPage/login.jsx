import React, { useState } from 'react';

const AuthComponent = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign-up logic here
      console.log('Sign up data:', formData);
    } else {
      // Handle sign-in logic here
      console.log('Sign in data:', formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <button
            type="button"
            className="w-full py-2 flex items-center justify-center bg-gray-800 text-white rounded hover:bg-gray-900 transition duration-300"
          >
            <img src="microsoft-icon.png" alt="Microsoft Icon" className="mr-2" />
            Sign in with Microsoft
          </button>
          <hr className="my-4" />
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full py-2 text-blue-500 hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Sign Up'}
          </button>
          {!isSignUp && (
            <p className="text-center text-blue-500 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;
