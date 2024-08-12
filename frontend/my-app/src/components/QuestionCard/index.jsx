// import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {updateUserAnswer} from "../../state";

import RenderOptions from "../Render";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
function QuestionCard({
  currentQuestionIndex,
  questions,
  handleNextQuestion,
  selectedOption,
  setSelectedOption,
}) {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentQuestion = questions[currentQuestionIndex];
  const [startTime, setStartTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const start = new Date();
    setStartTime(start);
  }, [currentQuestionIndex]);



  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateAnswer();
    if (!isValid) {
      return;
    }
    console.log(selectedOption);
    console.log(currentQuestion._id+ "question id");
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    console.log(`Time taken: ${timeTaken} seconds`);
    dispatch(updateUserAnswer({
      questionId : currentQuestion._id,
      userAnswer: selectedOption,
      timeTaken: timeTaken
    }))
    handleNextQuestion();

  };

 
  const validateAnswer = () => {
    if (Array.isArray(selectedOption)) {
      if (selectedOption.length === 0) {
        setErrorMessage('user answer is required.');
        return false;
      }
    }
    setErrorMessage(''); 
    return true;
  };

  return (
    <>
    <div className="container 2xl:pl-[186px] 2xl:pr-[186px] w-full mx-auto pt-[25px] box-border relative mt-[5.9rem]">
      <div
        className="test-card mt-[70px]"
        style={{ boxShadow: "3px 4px 10px rgba(201, 216, 225, .34)" }}
      >
        <div className="flex flex-wrap items-center mt-[-18px]">
          <div className="flex-grow ml-[2px] mr-[14px] mt-[18px]">
            <span className="text-[1rem] leading-6 font-semibold mr-[10px] tracking-[0.01em]">
              Question {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-medium">
              {currentQuestion.questionText}
            </h2>
            {currentQuestion.questoinImageURL && (
              <img
                src={currentQuestion.questoinImageURL}
                alt="Question"
                className="mt-2 w-[515px] h-auto object-contain"
              />
            )}
          </div>
          <form onSubmit={handleSubmit}>
          {RenderOptions({
              currentQuestion,
              selectedOption,
              setSelectedOption,
              setErrorMessage, 
            })}
            {errorMessage && (
                <div className="text-red-600 mt-2">{errorMessage}</div>
              )}
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-white text-black rounded hover:text-green-600 hover:outline-none
              hover:border-green-400  transition duration-300 border border-gray-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default QuestionCard;
