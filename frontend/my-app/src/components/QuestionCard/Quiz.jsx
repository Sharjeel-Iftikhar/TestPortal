import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from './index.jsx';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/index.jsx';
import { useState } from 'react';

import {updateUserAnswer} from "../../state";
import {finalizeQuiz} from "../../state";



const Quiz = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [selectedOption, setSelectedOption] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const questions = useSelector((state) => state.auth.quiz.questions);
  const currentQuestion = questions[currentQuestionIndex];
  const record = useSelector((state) => state.auth.record);
  


  useEffect(() => {
    if (isQuizCompleted) return;
    if (timeLeft === 0) {
      handleNextQuestion();
      console.log("question id "+ currentQuestion._id);
      console.log("time taken " + 120);
      console.log("user answer "+ '') 
      dispatch(updateUserAnswer({
        questionId : currentQuestionIndex._id,
        userAnswer: '',
        timeTaken: 120
      }))
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex]);


  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption([]);
      setTimeLeft(120);
    } else {
      // Handle end of quiz logic
      dispatch(finalizeQuiz())
      setIsQuizCompleted(true);
      alert('Quiz completed!');
      
      navigate('/record');
      
      
      console.log(JSON.stringify(record));
    }
  };

  
    
  
  

  return (
    <div>
      <Header timeLeft={timeLeft} />
    
      {questions.length > 0 ? (
        <QuestionCard currentQuestionIndex = {currentQuestionIndex} questions={questions} 
        handleNextQuestion={handleNextQuestion} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      ) : (
        <div>Loading questions...</div>
      )}
    </div>
      
  );
};

export default Quiz;
