import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AuthComponent from './components/LoginPage/index'

import Home from './components/HomePage/index'
import ProtectedQuiz from './components/QuestionCard/ProtectedQuiz';
import QuizWrapper from './components/QuestionCard/QuizWrapper';
import Record from './components/QuizRecord/index';
import ProtectedRoute from './Routes';

import QuizRecordTable from './components/Table/index'
import QuizRecordTableWrapper from './components/Table/RecordTable'


function App() {
  const userDate = localStorage.getItem('user');
  const user = JSON.parse(userDate);
  console.log(user ? 'User is logged in' : 'User is not logged in');
 
  
  return (
    <Router>
    <div className=" bg-custom-light-blue font-aktiv-grotesk">
        {/* <Header /> */}
        <Routes>

        {/* Public Routes   */}

        <Route path="/login" element={user ? <Navigate to="/" /> : <AuthComponent />} />
        {/* <Route path="/login" element={user ? <Navigate to="/" /> : <QuizRecordTable />} /> */}
        <Route path="/signup" element={user ? <Navigate to="/" /> : <AuthComponent />} />

        {/* protected routes */}
        
        <Route path="/" element={<ProtectedRoute element={Home} />} />
          <Route path="/test" element={<ProtectedRoute element={ProtectedQuiz} />} />
          <Route path="/record" element={<ProtectedRoute element={Record} />} />
          <Route
          path="/allData"
          element={<ProtectedRoute element={QuizRecordTableWrapper} />}
        />
        </Routes> 
      </div>
  </Router>
  );
}

export default App;
