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

    console.log(JSON.stringify(action.payload.title));
      state.quiz.title = action.payload.title;
      state.quiz.questions = action.payload.questions;
     
    },
    recordQuiz: (state, action) => {
        state.record.quizId = action.payload._id; // Assuming _id is passed with the quiz data
        state.record.userId = state.user?._id || ''; // Set the user ID if available
        state.record.startTime = new Date().toISOString();  // Set start time when the quiz is loaded
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
      const existingAnswerIndex = state.record.userAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswerIndex > -1) {
        // Update the existing answer
        state.record.userAnswers[existingAnswerIndex] = {
          questionId,
          userAnswer,
          timeTaken,
        };
      } else {
        // Add new answer
        state.record.userAnswers.push({
          questionId,
          userAnswer,
          timeTaken,
        });
      }

      state.record.totalTimeTaken += timeTaken; // Update the total time taken
    },
    finalizeQuiz: (state) => {
      state.record.endTime = new Date().toISOString();
      // Optionally, you can calculate the score here based on correct answers
      // state.record.score = calculateScore(state.record.userAnswers, state.quiz.questions);
    }
  }
});

export const { login, logout,setName, setQuiz, resetQuiz, updateUserAnswer, finalizeQuiz } = authSlice.actions;
export default authSlice.reducer;
