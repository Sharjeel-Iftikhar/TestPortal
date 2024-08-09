import React, { useState,useEffect } from 'react';

const QuestionItem = ({ question, index, expanded, record }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isMultipleChoice =
    question.options.filter((option) => option.isCorrect).length > 1;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const renderOptions = () => {
    const userAnswerRecord = record.userAnswers.find(
      (answer) => answer.questionId === question._id
    );

    return question.options.map((option, idx) => {
      const isSelected = userAnswerRecord?.userAnswer.includes(option.optionText);
      const isCorrect = option.isCorrect;
      const isTrue = userAnswerRecord?.isCorrect; // Assuming `isTrue` indicates if the user answered correctly.

      let optionStyle = "w-full flex items-center mb-5 mt-5 p-2 rounded-md  ";
      let icon = null;

      if (isSelected) {
        if (isTrue) {
          optionStyle += "bg-[#f0fdf8]";
          icon = (
            <span className="mr-2 text-green-500">
             <img src='./icons8-tick-24.png'/>
            </span>
          );
        } else {
          optionStyle += "";
          icon = (
            <span className="mr-2 text-red-500">
              <img src='./icons8-cross-mark-24.png'/>
            </span>
          );
        }
      }
      const isImageOptions = question.options.every(option =>
        option.optionText.startsWith('http'));

      return (
        <div key={idx} className={optionStyle}>
          {icon}
          <input
            type={isMultipleChoice ? "checkbox" : "radio"}
            name="option"
            className={`mr-4 h-6 w-6 ${icon ? '' : 'ml-[33px]'}  border-gray-300 rounded-sm text-green-500 focus:ring-green-500`}
            checked={isSelected}
            readOnly
          />
          {isImageOptions ?  <img
              data-question-id={question._id} // Add a unique identifier for the images
              src={option.optionText}
              alt={`Option ${index + 1}`}
              className="w-[102px] h-auto object-contain"
            /> :<label className="ml-2">{option.optionText}</label> }
          
        </div>
      );
    });
  };

  const userAnswerRecord = record.userAnswers.find(
    (answer) => answer.questionId === question._id
  );

  const correctOptions = question.options
      .filter((option) => option.isCorrect)
      .map((option) => option.optionText)
      .join(", ");

  return (
    <div>
      <div className="pl-1 pt-4 pb-4">
        <div className="cursor-pointer items-start flex">
          <div className="flex-nowrap items-center justify-between flex-grow mb-[-4px]">
            <div className="mb-1 flex items-center ml-[-4px] mt-[-8px] flex-wrap">
              <div className="whitespace-nowrap ml-1 mt-[10px] text-[1rem] font-semibold leading-6 tracking-wider mr-2">
                <span>Q. {index}</span>
              </div>
              {!isExpanded && (
                <div className="ml-[20px] block mt-2 w-[1px] h-[19px] bg-[#e2ecf1]"></div>
              )}

              {!isExpanded && (
                <div className="ml-[19px] max-w-[350px] inline-block mr-2 whitespace-nowrap overflow-hidden text-[1rem] leading-6 font-normal text-ellipsis mt-[10px]">
                  <span>{question.questionText}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end flex-wrap-reverse text-left mb-1 items-center ml-[-4px] mt-[-30px]">
              <div className="justify-end mt-[1px] ml-[-2px] flex items-center flex-wrap">
                <div className="mt-2 inline-flex items-center">
                {userAnswerRecord?.isCorrect ? <p className="text-[.875rem] leading-5 tracking-wide uppercase text-[#0bc279]">
                   1/1P
                  </p>: <p className="text-[.875rem] leading-5 tracking-wide uppercase text-[#ff7067]">
                   0/1P
                  </p>} 
                  
                </div>
              </div>

              <button
                className="h-[28px] pl-[18px] flex-shrink-0 items-center justify-center border-none outline-none bg-transparent cursor-pointer text-[1rem] leading-5 font-semibold inline-flex"
                onClick={handleToggle}
              >
                {isExpanded ? (
                  <img
                    src="./icons8-expand-24.png"
                    alt="expand-icon"
                  />
                ) : (
                  <img
                    src="./icons8-collapse-24.png"
                    alt="collapse-icon"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mr-[36px]">
            <div className="max-w-[684px] mt-[14px] mb-3 font-normal break-words text-[1rem] leading-6">
              <p>{question.questionText}</p>
              {question.questoinImageURL && (
                <img
                  src={question.questoinImageURL}
                  alt="Question-image"
                  className="mt-2 w-[515px] h-auto object-contain"
                />
              )}

              
            </div>
            <form>{renderOptions()}</form>
            <div className="mt-4">
              {userAnswerRecord?.isCorrect  ? <div className="text-[.875rem] font-normal mt-[10px] text-[#808e9d]">
          Score
          <span className=' text-[#0bc279] ml-2 font-bold'> 
          1/1P
            </span> 
        </div>
        : <>

        <div className="text-[.875rem] font-normal mt-[10px] text-[#808e9d]">
          Score
          <span className=' text-[#ff7067] ml-2 font-bold'> 
          0/1P
            </span> 
        </div>
        <div className="text-[1rem] font-normal leading-6 mt-[10px] tracking-wider text-[#808e9d]">
            Possible  answers 
            
            <span className='ml-4 border px-[7px] py-[9px] rounded-md font-medium ' >
            {correctOptions} <span className='text-[.875rem] font-semibold'> 1(P)</span>
            </span>
            
        </div>

        </>
        }
            </div>

          </div>
        )}
      </div>
      {/* divider */}

      <hr
        className={` ${index === 9 ? "mb-6" : ""} ml-[-20px] mb-0 mt-3 h-[1px] `}
        style={{ width: "calc(100% + 40px)", backgroundColor: "rgba(0, 0, 0, .12)" }}
      />
    </div>
  );
};

export default QuestionItem;
