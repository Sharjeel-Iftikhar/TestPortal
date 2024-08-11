import React from 'react'
import Footer from '../Footer';
import TestStartForm from '../TestStartForm';
import Header from '../Header/index'



export const Home = () => {

  return (
    <>
    <Header/>
    <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full mx-auto pt-[25px] px-6 box-border relative mt-[5.9rem]'>
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

      <div className='test-card'> 
      <div className='text-[.75rem] leading-4 font-semibold tracking-wider text-[#0f2830] mt-[1px] ml-[4px] uppercase'>
          Instructions
      </div>
      <div className='text-[1rem] font-normal w-max-[1024px] leading-6 mt-[14px] mr-1 ml-1 mb-2'>
        <p>Hello!</p>
        <p className='mt-2 mb-2'>This test consists of 6 questions. The time to solve one question is 2 minutes.</p>
        <p className='mt-2 mb-2'>Make sure you have enough time and then start the test.</p>
        <p className='mt-2 mb-2'> &nbsp; </p>
        <p className='mt-2 mb-2'>Good luck!</p>
      </div>

    </div>

    <div className='flex content-between items-stretch  gap-4'>
      <div className='flex flex-col flex-grow items-stretch basis-[50%] '>
        <div className='test-card basis-[100%]'> 
            <div className='text-[.75rem] leading-4 font-semibold uppercase text-[#0f2830] mt-[1px] ml-[4px]'>Honest Respondent Technology
            </div>
            <div className='flex mt-5 items-start'>
              <div className='pl-1 mr-3'>
              <svg stroke="#0BC279" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.49 2.23L5.50003 4.11C4.35003 4.54 3.41003 5.9 3.41003 7.12V14.55C3.41003 15.73 4.19003 17.28 5.14003 17.99L9.44003 21.2C10.85 22.26 13.17 22.26 14.58 21.2L18.88 17.99C19.83 17.28 20.61 15.73 20.61 14.55V7.12C20.61 5.89 19.67 4.53 18.52 4.1L13.53 2.23C12.68 1.92 11.32 1.92 10.49 2.23Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M9.05005 11.87L10.66 13.48L14.96 9.17999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>

              </div>
              <div className='flex-grow pr-1 pb-1'>
                <div className='ml-1'>
                  
                Focus on your test only!
                        
                </div>
                <div className='text-[1rem] leading-6 font-normal mt-[14px] mr-1 mb-2 ml-1'>
                  <p className='mt-4 mb-4'>
                  "The test is secured with "
                  <b>Honest Respondent Technology</b>
                  ". Don't click outside the test tab area. Every browser tab movement is recorded."
                  </p>
                <p className='mt-4 mb-4'> 
                We recommend disabling background programs, chats and system notifications before the test, as they can trigger a test block.
                </p>
                </div>

              </div>

            </div>
        </div>

      </div>


      
      <TestStartForm/>

    </div>
    

    </div>
    <Footer/>
    

    
    </>
  )
}
export default Home;
