import React, { useState } from 'react';

const QuestionItem = ({ question, expanded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionChange = (option) => {
    if (question.options.length > 1) {
      setSelectedOption((prev) =>
        prev.includes(option.optionText)
          ? prev.filter((opt) => opt !== option.optionText)
          : [...prev, option.optionText]
      );
    } else {
      setUserAnswer(option.optionText);
    }
  };

  return (
    <div className="mb-4 border p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Question {question.index + 1}: {question.questionText}
        </h3>
        <button
          onClick={handleToggle}
          className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded || expanded ? (
        <div className="mt-2">
          {question.options.map((option) => {
            const isSelected = selectedOption.includes(option.optionText);
            const isCorrect = option.isCorrect;
            return (
              <div
                key={option._id}
                className={`flex items-center mb-2 p-2 border rounded-md ${
                  isSelected ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : ''
                }`}
              >
                <input
                  type={question.options.length > 1 ? 'checkbox' : 'radio'}
                  checked={isSelected}
                  onChange={() => handleOptionChange(option)}
                  className={`mr-2 h-5 w-5 border-gray-300 rounded-sm ${
                    isSelected ? (isCorrect ? 'text-green-500' : 'text-red-500') : ''
                  }`}
                />
                <label className={`ml-2 ${isCorrect && isSelected ? 'text-green-700' : ''}`}>
                  {option.optionText}
                </label>
                {isCorrect && isSelected && (
                  <span className="ml-2 text-green-500">✔</span>
                )}
              </div>
            );
          })}
          {question.options.length === 1 && (
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded"
              placeholder="Type your answer here"
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default QuestionItem;
