// import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {updateUserAnswer} from "../../state";

import renderOptions from "../Render";
function QuestionCard({



  currentQuestionIndex,

  questions,
  handleNextQuestion,
  selectedOption,
  setSelectedOption,
}) {
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentQuestion = questions[currentQuestionIndex];
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const start = new Date();
    setStartTime(start);
  }, [currentQuestionIndex]);


  // const isMultipleChoice =
  //   currentQuestion.options.filter((option) => option.isCorrect).length > 1;

  const handleSubmit = (e) => {
    e.preventDefault();
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

  // const renderOptions = () => {
  //   if (currentQuestion.options.length === 1) {
  //     return (
  //       <div className="flex flex-col space-y-4">
  //       <input
  //         type="text"
  //         className="w-[30%] p-2 border-b-2 border-gray-300 focus:border-green-500 outline-none mb-6 mt-4"
  //         placeholder="Type your answer here"
  //         value={selectedOption || ""}
  //         onChange={(e) => setSelectedOption(e.target.value)}
  //       />
  //       </div>
  //     );
  //   } else if (currentQuestion.options.length === 2) {
      
  //     return currentQuestion.options.map((option, index) => (
  //       <div key={index} className="flex items-center mb-5 mt-5">
  //         <input
  //           type="checkbox"
  //           className="mr-4 h-6 w-6"
  //           checked={selectedOption === option.optionText}
  //           onChange={() => setSelectedOption(option.optionText)}
  //         />
  //         <label>{option.optionText}</label>
  //       </div>
  //     ));
  //   } else if (isMultipleChoice) {
  //     return currentQuestion.options.map((option, index) => (
  //       <div key={index} className="flex items-center mb-5 mt-5" >
  //         <input
  //           type="checkbox"
  //           name="option"
  //           className="mr-4 h-6 w-6 border-gray-300 rounded-sm text-green-500 focus:ring-green-500 checked:bg-green-500 checked:border-transparent"
  //           checked={selectedOption.includes(option.optionText)}
  //           onChange={() => {
  //             if (selectedOption.includes(option.optionText)) {
  //               setSelectedOption(
  //                 selectedOption.filter((opt) => opt !== option.optionText)
  //               );
  //             } else {
  //               setSelectedOption([...selectedOption, option.optionText]);
  //             }
              
  //           }}
  //         />
  //         <label className="ml-2">{option.optionText}</label>
  //       </div>
  //     ));
  //   } else {
  //     const isImageOptions = currentQuestion.options.every(option => option.optionText.startsWith('http'));
  //     if(isImageOptions){
  //       return currentQuestion.options.map((option, index) => (
  //         <div key={index} className="flex items-center mb-5 mt-5">
  //           <input
  //             type="radio"
  //             name="option"
  //             className="mr-4 h-6 w-6 border-gray-300 rounded-sm text-green-500 focus:ring-green-500 checked:bg-green-500 checked:border-transparent"
  //             checked={selectedOption === option.optionText}
  //             onChange={() => setSelectedOption(option.optionText)}
  //           />
  //           <label className="ml-2">
  //             <img
  //               data-question-id={currentQuestion._id} // Add a unique identifier for the images
  //               src={option.optionText}
  //               alt={`Option ${index + 1}`}
  //               className="w-[102px] h-auto object-contain"
                        
  //               />
  //           </label>
  //         </div>
  //       ));
  //     }
  //     else{
  //     return currentQuestion.options.map((option, index) => (
  //       <div key={index} className="flex items-center mb-5 mt-5">
  //         <input
  //           type="radio"
  //           name="option"
  //           className="mr-4 h-6 w-6 border-gray-300 rounded-sm text-green-500 focus:ring-green-500 checked:bg-green-500 checked:border-transparent"
  //           checked={selectedOption === option.optionText}
  //           onChange={() => setSelectedOption(option.optionText)}
  //         />
  //         <label className="ml-2">{option.optionText}</label>
  //       </div>
  //     ));
  //   }
  //   }
   
  // };

  return (
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
          {renderOptions({
              currentQuestion,
              selectedOption,
              setSelectedOption
            })}
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
  );
}

export default QuestionCard;
