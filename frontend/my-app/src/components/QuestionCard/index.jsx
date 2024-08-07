function QuestionCard({
  currentQuestionIndex,
  questions,
  handleNextQuestion,
  selectedOption,
  setSelectedOption,
}) {
  const currentQuestion = questions[currentQuestionIndex];
  const isMultipleChoice =
    currentQuestion.options.filter((option) => option.isCorrect).length > 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedOption);
    handleNextQuestion();
  };

  const renderOptions = () => {
    if (currentQuestion.options.length === 1) {
      return (
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Type your answer here"
          value={selectedOption || ""}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
      );
    } else if (currentQuestion.options.length === 2) {
      return currentQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
          />
          <label>{option}</label>
        </div>
      ));
    } else if (isMultipleChoice) {
      return currentQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            name="option"
            className="mr-2 h-5 w-5 border-gray-300 rounded-sm text-green-500 focus:ring-green-500"
            checked={selectedOption.includes(option.optionText)}
            onChange={() => {
              if (selectedOption.includes(option.optionText)) {
                setSelectedOption(
                  selectedOption.filter((opt) => opt !== option.optionText)
                );
              } else {
                setSelectedOption([...selectedOption, option.optionText]);
              }
              
            }}
          />
          <label className="ml-2">{option.optionText}</label>
        </div>
      ));
    } else {
      return currentQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="radio"
            name="option"
            className="mr-2 h-5 w-5 border-gray-300 rounded-sm text-green-500 focus:ring-green-500"
            checked={selectedOption === option.optionText}
            onChange={() => setSelectedOption(option.optionText)}
          />
          <label className="ml-2">{option.optionText}</label>
        </div>
      ));
    }
    // else {
    //   return currentQuestion.options.map((option, index) => (
    //     <div key={index} className="flex items-center mb-2">
    //       <input
    //         type="radio"
    //         name="option"
    //         className="mr-2"
    //         checked={selectedOption === option}
    //         onChange={() => setSelectedOption(option)}
    //       />
    //       <label>{option}</label>
    //     </div>
    //   ));
    // }
  };

  return (
    <div className="container 2xl:pl-[186px] 2xl:pr-[186px] w-full mx-auto pt-[25px] box-border relative">
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
            {currentQuestion.questionImageURL && (
              <img
                src={currentQuestion.questionImageURL}
                alt="Question"
                className="mt-2 w-full h-auto"
              />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            {renderOptions()}
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-custom-button-color text-white rounded hover:bg-green-600 transition duration-300"
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
