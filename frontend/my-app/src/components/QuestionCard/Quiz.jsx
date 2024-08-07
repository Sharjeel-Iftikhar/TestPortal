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
        category: "Generic",
        questionText: "Which of the following is not a primary color?",
        options: [
          { optionText: "A", isCorrect: true, _id: "66b0b243b295199693ace999" },
          { optionText: "B", isCorrect: false, _id: "66b0b243b295199693ace99a" },
          { optionText: "C", isCorrect: true, _id: "66b0b243b295199693ace99b" },
          { optionText: "D", isCorrect: true, _id: "66b0b243b295199693ace99c" },
        ],
      },
      {
        category: "Data-Analysis",
        questionText: "Which factories have production results higher than 350 in 2019?",
        questionImageURL: "https://utfs.io/f/3e54985e-66c1-49a6-b6ff-6e3fa498ea0a-5cp1kc.jpg",
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
        questionImageURL: "https://drive.google.com/file/d/1AZEblHK5qvbnB1u7ep-f_3NS5rMpwO0g/view",
        options: [
          { optionText: "Answer", isCorrect: true, _id: "66b0b243b295199693ace997" },
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
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNextQuestion();
          return 120; // Reset timer for next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);


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
