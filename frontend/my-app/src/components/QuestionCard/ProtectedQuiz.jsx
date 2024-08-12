import React from 'react';
import withQuizGuard from './QuizWrapper';
import Quiz from './Quiz';

const ProtectedQuiz = withQuizGuard(Quiz);

export default ProtectedQuiz;