import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AuthComponent from './components/LoginPage/index'

import Home from './components/HomePage/index'
import Quiz from './components/QuestionCard/Quiz';
import Record from './components/QuizRecord/index';
import ProtectedRoute from './Routes';
import { useSelector } from 'react-redux';



function App() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user ? 'User is logged in' : 'User is not logged in');
  
  return (
    <Router>
    <div className=" bg-custom-light-blue font-aktiv-grotesk">
        {/* <Header /> */}
        <Routes>

        {/* Public Routes   */}

        <Route path="/login" element={user ? <Navigate to="/" /> : <AuthComponent />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <AuthComponent />} />

        {/* protected routes */}
        <Route path="/" element={<ProtectedRoute element={Home} />} />
          <Route path="/test" element={<ProtectedRoute element={Quiz} />} />
          <Route path="/record" element={<ProtectedRoute element={Record} />} />
        </Routes> 
      </div>
  </Router>
  );
}

export default App;
