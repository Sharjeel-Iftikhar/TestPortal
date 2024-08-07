import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthComponent from './components/LoginPage/index'
import Header from './components/Header/index'
import Home from './components/HomePage/index'
import Quiz from './components/QuestionCard/Quiz';
import Record from './components/QuizRecord/index';

function App() {
  return (
    <Router>
    <div className=" bg-custom-light-blue font-aktiv-grotesk">
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<AuthComponent/>} />
          <Route path="/signup" element={<AuthComponent/>} />
          <Route path="/" element={<Home/>} />
          <Route path='/test' element={<Quiz/>} />
          <Route path='/record' element={<Record/>} />
        </Routes> 
      </div>
  </Router>
  );
}

export default App;
