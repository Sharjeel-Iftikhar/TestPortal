import React, { useState } from 'react';
import QuestionItem from './QuestionItem';
import { useSelector } from 'react-redux';



const QuestionList = ({ questions }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleAll = () => {
    setExpanded(!expanded);
  };

  const record = useSelector((state) => state.auth.record);

  return (
    <>
    <div className="test-card">
        {/* Question list */}
        <div className='flex justify-between flex-wrap items-center mt-[-12px]'>
            <div className='leading-6 mt-3 text-[.75rem] tracking-wider uppercase font-semibold text-[#0f2830] ml-1'>
                <span>Questions</span>
                <span className='text-[#bcc3ca]'> (9)</span>

            </div>

            <div className='flex-grow mr-1 justify-end flex-wrap text-right flex mt-3'>
                <div className='h-[23px] pl-4 min-w-[80px] flex'>
                    <span className='pt-[1px] leading-6 text-right text-[1rem] font-semibold '>
                    {expanded ? 'Expand all':'Collapse all'}
                    </span>
                    <div className='mr-[3px] ml-[13px] w-[10px] h-[18px] text-[18px] mt-[5px]'>
                    {expanded ? 
                    <img src='./expand.svg' alt='expand icon' onClick={handleToggleAll} /> : <img src='./collapse.svg' alt='collapse icon' onClick={handleToggleAll} />}
                    </div>

                </div>

            </div>

        </div>

        {/* divider */}
        <hr className='ml-[-20px] mb-0 mt-5 h-[1px] 'style={{width: 'calc(100% + 40px)', backgroundColor: 'rgba(0, 0, 0, .12)'}} />


        {/* Question items */}

        { questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            expanded={expanded}
            index = {index + 1}
            record = {record}
          />
        ))}

    </div>
     

     </>
  );
};

export default QuestionList;
