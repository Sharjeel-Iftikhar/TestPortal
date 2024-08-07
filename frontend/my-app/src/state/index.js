import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  quiz: {
    title: '',
    questions: []
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
    },
    setQuiz: (state, action) => {
      state.quiz.title = action.payload.title;
      state.quiz.questions = action.payload.questions;
    },
    resetQuiz: (state) => {
      state.quiz = {
        title: '',
        questions: []
      };
    }
  }
});

export const { login, logout, setQuiz, resetQuiz } = authSlice.actions;
export default authSlice.reducer;
