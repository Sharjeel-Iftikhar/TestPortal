import React, { useEffect,useCallback, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from './index.jsx';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/index.jsx';
import { useState } from 'react';

import {updateUserAnswer} from "../../state";
import {finalizeQuiz} from "../../state";

let quizRenderCount = 0;

const Quiz = () => {

  quizRenderCount++;
  console.log(`Quiz component render count: ${quizRenderCount}`);

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

    if (!questions.length) {
      navigate('/'); 
      return;
    }
    if (isQuizCompleted) {
     
      return;
    }
    
    if (timeLeft === 0) {
      handleNextQuestion();
      dispatch(updateUserAnswer({
        questionId: questions[currentQuestionIndex]._id,
        userAnswer: '',
        timeTaken: 120
      }));
    }
  }, [timeLeft, currentQuestionIndex, isQuizCompleted]);

 


  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption([]);
      setTimeLeft(120); // Reset time for next question
    } else {
      dispatch(finalizeQuiz());
      setIsQuizCompleted(true);
      // localStorage.setItem('quizCompleted', 'true'); 
      alert('Quiz completed!');
      navigate('/record', { replace: true });
    }
  }, [currentQuestionIndex, dispatch, navigate, questions.length]);

  if(!questions || !questions.length){
    return <div>Loading...
     
    </div>;
  }
  
  return (
    <div>
      <Header timeLeft={timeLeft} setTimeLeft={setTimeLeft}  />
    
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
