import mongoose from "mongoose";   

const quizRecordSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userAnswers:[
        {
            questionId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Quiz.questions',
                required: true
            },
            userAnswer:{
                type: String,
                required: true
            },
            correctAnswer:{
                type: String,
                required: true
            },
            timeTaken:{
                type: Number,
                required: true
            },
            isCorrect:{
                type: Boolean,
                required: true
            }
        }
    ],
    totalTimeTaken : {
        type: Number
    },
    score: {
        type: Number,
        required: true
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    }
},
    {timestamps: true}

)

const QuizRecord = mongoose.model("QuizRecord", quizRecordSchema);
export default QuizRecord;
