import Quiz from '../models/Quiz.js'
import QuizRecord from '../models/QuizRecord.js'


export const getQuiz = async (req, res) => {
    try {
      const title = 'Sample Reasoning Test'; 
      const quiz = await Quiz.find({ title });
      res.json(quiz);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

///// to get all the quizRecord //////////////////////


export const getQuizRecord = async (req, res) => {
    try {
        const quizRecord = await QuizRecord.find().sort({ createdAt: -1 });
      res.json(quizRecord);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

///////////////////////  save the QuizRecord ///////////////////

export const saveQuizRecord = async (req, res) => {
  try {
      const { quizId, userId, userAnswers, totalTimeTaken, score, startTime, endTime } = req.body;

      if (!quizId || !userId || !userAnswers || !totalTimeTaken || !score || !startTime || !endTime) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if a record with the same quizId and userId already exists
      const existingRecord = await QuizRecord.findOne({ quizId, userId });

      if (existingRecord) {
          return res.status(409).json({ error: 'A record for this quiz and user already exists' });
      }

      // Create and save the new quiz record
      const quizRecord = new QuizRecord({
          quizId,
          userId,
          userAnswers,
          totalTimeTaken,
          score,
          startTime,
          endTime
      });

      await quizRecord.save();
      res.status(201).json(quizRecord);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

