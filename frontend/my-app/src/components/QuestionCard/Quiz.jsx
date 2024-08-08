import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from './index.jsx';
import { setQuiz } from '../../state/index.js'; // adjust the path to your authSlice file
import Header from '../Header/index.jsx';
import { useState } from 'react';

const quizData = {
    _id: "66b0b243b295199693ace992",
    title: "Sample Reasoning Test",
    questions: [
      
      {
        category: "Data-Analysis",
        questionText: "Which factories have production results higher than 350 in 2019?",
        questionImageURL: "https://utfs.io/f/d0910598-57fa-491f-acba-9750fb059830-i46u8p.png",
        options: [
          { optionText: "A", isCorrect: true, _id: "66b0b243b295199693ace993" },
          { optionText: "B", isCorrect: false, _id: "66b0b243b295199693ace994" },
          { optionText: "C", isCorrect: true, _id: "66b0b243b295199693ace995" },
          { optionText: "D", isCorrect: true, _id: "66b0b243b295199693ace996" },
        ],
      },
      {
        category: "Data-Analysis",
        questionText: "Please consider the following production results of 5 factories.",
        questionImageURL: "https://utfs.io/f/2446d75d-0fb4-4f71-acd0-5171a1c0e288-ebynfq.png",
        options: [
          { optionText: "Answer", isCorrect: true, _id: "66b0b243b295199693ace997" },
        ],
      },
      {
        category: "Generic",
        questionText: "Which of the following is not a primary color?",
        options: [
          { optionText: "A", isCorrect: true, _id: "66b0b243b295199693ace999" },
          { optionText: "B", isCorrect: false, _id: "66b0b243b295199693ace99a" },
          { optionText: "C", isCorrect: true, _id: "66b0b243b295199693ace99b" },
          { optionText: "D", isCorrect: true, _id: "66b0b243b295199693ace99c" },
        ],
      },
    ],
  };
  

const Quiz = () => {
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [selectedOption, setSelectedOption] = useState([]);




  // Dispatch the quiz data to the Redux store
  useEffect(() => {
    dispatch(setQuiz(quizData));
  },[dispatch]); 


  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion(); 
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
      alert('Quiz completed!');
    }
  };

  const questions = useSelector((state) => state.auth.quiz?.questions);

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
