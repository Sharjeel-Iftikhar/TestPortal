import { configureStore } from '@reduxjs/toolkit';
import authReducer from './index.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if you have any
  },
});

export default store;
