import React from 'react';
import QuizRecordTable from './index';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';

const QuizRecordTableWrapper = () => {
    

  return(
    <>
    <Header />
    <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full mx-auto box-border relative mt-[104px]'>
      <div className="test-card">
      <QuizRecordTable />
      </div>
      
    </div>
    <Footer />
    </>
  ) 
};

export default QuizRecordTableWrapper;
