import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  firstname: '',
  lastname: '',
  quiz: {
    title: '',
    questions: []
  },
  record: {
    quizId: '',
    userId: '',
    userAnswers: [],
    totalTimeTaken: 0,
    score: 0,
    startTime: null,
    endTime: null
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.quiz = {
        title: '',
        questions: []
      };
      state.record = {
        quizId: '',
        userId: '',
        userAnswers: [],
        totalTimeTaken: 0,
        score: 0,
        startTime: null,
        endTime: null
      };
    },
    setName: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },

    setQuiz: (state, action) => {

    // console.log(JSON.stringify(action.payload));
      state.quiz.title = action.payload.title;
      state.quiz.questions = action.payload.questions;
      state.record.quizId = action.payload._id;  // Assuming _id is passed with the quiz data
      state.record.userId = state.user?._id || ''; // Set the user ID if available

      state.record.startTime = new Date().toISOString();  // Set start time when the quiz is loaded

      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;

      // console.log(state.record.startTime);
     
    },
    
    resetQuiz: (state) => {
      state.quiz = {
        title: '',
        questions: []
      };
      state.record = {
        quizId: '',
        userId: '',
        userAnswers: [],
        totalTimeTaken: 0,
        score: 0,
        startTime: null,
        endTime: null
      };
    },
    updateUserAnswer: (state, action) => {
      const { questionId, userAnswer, timeTaken } = action.payload;
      
      const question = state.quiz.questions.find(q => q._id === questionId);
      const correctAnswer = question.options
        .filter(option => option.isCorrect)
        .map(option => option.optionText);
      
      const formattedUserAnswer = Array.isArray(userAnswer)
        ? userAnswer.join(',')
        : userAnswer;
    
      const formattedCorrectAnswer = correctAnswer.join(',');
    
      const isCorrect = formattedUserAnswer === formattedCorrectAnswer;
      
      const existingAnswerIndex = state.record.userAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );
      
      if (existingAnswerIndex > -1) {
        // Update the existing answer
        state.record.userAnswers[existingAnswerIndex] = {
          questionId,
          userAnswer: formattedUserAnswer,
          correctAnswer: formattedCorrectAnswer,
          timeTaken,
          isCorrect,
        };
      } else {
        // Add new answer
        state.record.userAnswers.push({
          questionId,
          userAnswer: formattedUserAnswer,
          correctAnswer: formattedCorrectAnswer,
          timeTaken,
          isCorrect,
        });
      }
      
      state.record.totalTimeTaken += timeTaken; // Update the total time taken
    },

    finalizeQuiz: (state) => {
      
      state.record.endTime = new Date().toISOString();
  
      // Calculate the score
      state.record.score = state.record.userAnswers.reduce((score, answer) => {
        return answer.isCorrect ? score + 1 : score;
      }, 0);
      console.log(state.record.score);
    }
  }
});

export const { login, logout,setName, setQuiz, resetQuiz, updateUserAnswer, finalizeQuiz } = authSlice.actions;
export default authSlice.reducer;
