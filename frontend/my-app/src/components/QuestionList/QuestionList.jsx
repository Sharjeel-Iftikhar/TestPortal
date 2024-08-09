import React, { useState } from 'react';
import QuestionItem from './QuestionItem';


const QuestionList = ({ questions }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleAll = () => {
    setExpanded(!expanded);
  };

  

  return (
    <div className="test-card">
        {/* Question list */}
        <div className='flex justify-between flex-wrap items-center mt-[-12px]'>
            <div className='leading-6 mt-3 text-[.75rem] tracking-wider uppercase font-semibold text-[#0f2830] ml-1'>
                <span>Questions</span>
                <span className='text-[#bcc3ca]'> (6)</span>

            </div>

            <div className='flex-grow mr-1 justify-end flex-wrap text-right flex mt-3'>
                <div className='h-[23px] pl-4 min-w-[80px] flex'>
                    <span className='pt-[1px] leading-6 text-right text-[1rem] font-semibold '>
                    Collapse all
                    </span>
                    <div className='mr-[3px] ml-[13px] w-[10px] h-[18px] text-[18px] mt-[5px]'>
                    <svg width="10" height="18" viewBox="0 0 10 18" stroke="#505D6B" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1.000000, 2.000000)" stroke-width="1.8"><polyline points="0 0 4 4 8 0"></polyline><polyline points="8 14 4 10 0 14"></polyline></g></svg>
                    </div>

                </div>

            </div>

        </div>

        {/* divider */}
        <hr className='ml-[-20px] mb-0 mt-5 h-[1px] 'style={{width: 'calc(100% + 40px)', backgroundColor: 'rgba(0, 0, 0, .12)'}} />


        {/* Question items */}

        {/* { questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            expanded={expanded}
          />
        ))} */}



      {/* <button
        onClick={handleToggleAll}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {expanded ? 'Collapse All' : 'Expand All'}
      </button>
      <div>
      {console.log(questions.length)}

        
      </div> */}
    </div>
  );
};

export default QuestionList;
