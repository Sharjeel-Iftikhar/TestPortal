import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './database/db.js'

import authRouter from './routes/auth.js'
import quizRouter from './routes/quiz.js'
import userRouter from './routes/user.js'
import cors from 'cors';

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// const sampleQuiz = new Quiz({
//     title: "Sample Reasoning Test",
//     questions: [
//         {
//             category: "Generic",
//             questionText: "Which of the following is not a primary color?",
//             options: [
//                 { optionText: "Red", isCorrect: false },
//                 { optionText: "Green", isCorrect: true },
//                 { optionText: "Blue", isCorrect: false },
//                 { optionText: "Yellow", isCorrect: false },
//             ],
//         },
//         {
//             category: "Data-Analysis",
//             questionText: "Which factories have production results higher than 350 in 2019?",
//             questoinImageURL : "https://drive.google.com/file/d/1IaBrnlcVqlezkrT25EfROODT1jVe2I77/view",
//             options:[
//                 { optionText: "A", isCorrect: true },
//                 { optionText: "B", isCorrect: false },
//                 { optionText: "C", isCorrect: true },
//                 { optionText: "D", isCorrect: true}
//             ],

//         },
//         {
//             category: "Data-Analysis",
//             questionText: "Please consider the following production results of 5 factories.",
//             questoinImageURL : "https://drive.google.com/file/d/1AZEblHK5qvbnB1u7ep-f_3NS5rMpwO0g/view",
//             options:[
//                 { optionText: "3", isCorrect: true },
//             ],

//         },
//         {
//             category: "Data-Analysis",
//             questionText: "If the average of four numbers is 12, what is the sum of the numbers?",
//             options: [
//                 { optionText: "36", isCorrect: false },
//                 { optionText: "48", isCorrect: true },
//                 { optionText: "52", isCorrect: false },
//                 { optionText: "60", isCorrect: false },
//             ],
//         },
//         {
//             category: "Inductive Reasoning",
//             questionText: "All roses are flowers. This plant is a rose. Therefore, this plant is a ________.",
//             options: [
//                 { optionText: "Tree", isCorrect: false },
//                 { optionText: "Shrub", isCorrect: false },
//                 { optionText: "Flower", isCorrect: true },
//                 { optionText: "Grass", isCorrect: false },
//             ],
//         },
//         {
//             category: "Generic",
//             questionText: "The capital of France is ________.",
//             options: [
//                 { optionText: "Berlin", isCorrect: false },
//                 { optionText: "Madrid", isCorrect: false },
//                 { optionText: "Paris", isCorrect: true },
//                 { optionText: "Rome", isCorrect: false },
//             ],
//         },
//         {
//             category: "Data-Analysis",
//             questionText: "A dataset with a mean of 50 will have the same mean if a constant value is added to each data point. True or False?",
//             options: [
//                 { optionText: "True", isCorrect: false },
//                 { optionText: "False", isCorrect: true },
//             ],
//         },
//         {
//             category: "Inductive Reasoning",
//             questionText: "If all cats are mammals and this animal is a cat, then this animal is a mammal. True or False?",
//             options: [
//                 { optionText: "True", isCorrect: true },
//                 { optionText: "False", isCorrect: false },
//             ],
//         },
//         {
//             category: "Inductive Reasoning",
//             questionText: "Which image should be next in the sequence?",
//             options: [
//                 { optionText: "https://drive.google.com/file/d/1LnG9V9bOhoilbPH-2NR83Bb3PU1VArE_/view", isCorrect: false },
//                 { optionText: "https://drive.google.com/file/d/1B-3Vux43ChQb1AndFTBELLOkATCRRdXB/view?usp=sharing", isCorrect: true },
//                 {optionText:"https://drive.google.com/file/d/1-CeNzsP1OpEn7dnYQRGWpaP23rYPjxev/view?usp=sharing", isCorrect: false}
//             ],
//         }
        
//     ],
// });


const start = async () => {
    try {
        connectDB()
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
        // await sampleQuiz.save();
    }
    catch (error) {
        console.log(error)
    }
}

// Routes

app.use('/exam/auth', authRouter);
app.use('/exam/',quizRouter);
app.use('/user/',userRouter);

start()