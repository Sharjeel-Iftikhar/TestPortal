import React from "react";

const renderOptions = ({
  currentQuestion,
  selectedOption,
  setSelectedOption
}) => {
  const isMultipleChoice =
    currentQuestion.options.filter((option) => option.isCorrect).length > 1;

  if (currentQuestion.options.length === 1) {
    return (
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="w-[30%] p-2 border-b-2 border-gray-300 focus:border-green-500 outline-none mb-6 mt-4"
          placeholder="Type your answer here"
          value={selectedOption || ""}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
      </div>
    );
  } else if (currentQuestion.options.length === 2) {
    return currentQuestion.options.map((option, index) => (
      <div key={index} className="flex items-center mb-5 mt-5">
        <input
          type="checkbox"
          className="mr-4 h-6 w-6"
          checked={selectedOption === option.optionText}
          onChange={() => setSelectedOption(option.optionText)}
        />
        <label>{option.optionText}</label>
      </div>
    ));
  } else if (isMultipleChoice) {
    return currentQuestion.options.map((option, index) => (
      <div key={index} className="flex items-center mb-5 mt-5">
        <input
          type="checkbox"
          name="option"
          className="mr-4 h-6 w-6 border-gray-300 rounded-sm text-green-500 focus:ring-green-500 checked:bg-green-500 checked:border-transparent"
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
    const isImageOptions = currentQuestion.options.every(option =>
      option.optionText.startsWith('http')
    );
    if (isImageOptions) {
      return currentQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center mb-5 mt-5">
          <input
            type="radio"
            name="option"
            className="mr-4 h-6 w-6 border-gray-300 rounded-sm text-green-500 focus:ring-green-500 checked:bg-green-500 checked:border-transparent"
            checked={selectedOption === option.optionText}
            onChange={() => setSelectedOption(option.optionText)}
          />
          <label className="ml-2">
            <img
              data-question-id={currentQuestion._id} // Add a unique identifier for the images
              src={option.optionText}
              alt={`Option ${index + 1}`}
              className="w-[102px] h-auto object-contain"
            />
          </label>
        </div>
      ));
    } else {
      return currentQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center mb-5 mt-5">
          <input
            type="radio"
            name="option"
            className="mr-4 h-6 w-6 border-gray-300 rounded-sm text-green-500 focus:ring-green-500 checked:bg-green-500 checked:border-transparent"
            checked={selectedOption === option.optionText}
            onChange={() => setSelectedOption(option.optionText)}
          />
          <label className="ml-2">{option.optionText}</label>
        </div>
      ));
    }
  }
};

export default renderOptions;
