import React from 'react'
import Header from '../Header'

export default function QuizRecord() {
  return (
    <>
    <Header />
    <div className='container 2xl:pl-[186px] 2xl:pr-[186px] w-full mx-auto pt-[25px] box-border relative'>
      <div className='border-none bg-white rounded-md p-5 mb-5 justify-between mt-[70px]' 
      style={{boxShadow: '3px 4px 10px rgba(201, 216, 225, .34)'}}>
        <div className='flex flex-wrap items-center mt-[-18px]'>
          <div className=' flex-grow ml-[2px] mr-[14px] mt-[18px]'>
          <span className='text-[1.125rem] leading-6 font-semibold'>
          Example Reasoning Test
          </span>
          </div>

        </div>
          
      </div>
      </div>
    </>  
  )
}
