import React from 'react'
import Header from '../Header'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionList from '../QuestionList/QuestionList';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

export default function QuizRecord() {
  const navigate = useNavigate();
  const questions = useSelector((state) => state.auth.quiz?.questions);
  const record = useSelector((state) => state.auth.record);
  const firstName = useSelector((state) => state.auth.firstname);
  const lastName = useSelector((state) => state.auth.lastname);


  const [percentage, setPercentage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const correctQuestions = record.score;
  const totalQuestions = record.userAnswers.length;
  const allTime = totalQuestions * 120;
  const elapsedTime = record.totalTimeTaken;
  const totalTime = allTime;

  const strtTime = record.startTime;
  const endTime = record.endTime;

  const timeProgress = (elapsedTime / totalTime) * 100;

  // const handleToggleAll = () => {
  //   setExpanded(!expanded);
  // };

  useEffect(() => {

    if (!questions.length) {
      navigate('/');
      return;
    }
    
    const targetPercentage = (correctQuestions / totalQuestions) * 100;
    const duration = 1000; // Duration of the animation in milliseconds
    const increment = targetPercentage / (duration / 10); // How much to increment each interval

    const interval = setInterval(() => {
      setPercentage(prev => {
        if (prev >= targetPercentage) {
          clearInterval(interval);
          return targetPercentage;
        }
        return prev + increment;
      });
    }, 10); // Update every 10ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    // Format hours, minutes, and seconds with leading zeros
    const hrsStr = hrs < 10 ? `0${hrs}:` : `${hrs}:`;
    const minsStr = mins < 10 ? `0${mins}:` : `${mins}:`;
    const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
  
  
    return `${hrs > 0 ? hrsStr : '00:'}${minsStr}${secsStr}`;
  };

  const formatStartTime = (dateString) => {
    const date = new Date(dateString);
  
    const hours = date.getUTCHours(); // Use getUTCHours for UTC time
    const minutes = date.getUTCMinutes(); // Use getUTCMinutes for UTC time
  
    // Format hours and minutes with leading zeros
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${hoursStr}:${minutesStr}`;
  };
  const formatDate =(dateString) =>{
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user._id;

  const upateUser = async () => {
    try {
      const data = {
        userId: user_id,
        Firstname: firstName,
        Lastname: lastName
      }

      console.log(data);

      const response = await fetch('http://localhost:3000/user/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": '*',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(response);
        console.log('User updated successfully');
      } else {
        console.log('Failed to update user');
      }

    }
    catch (err) {
      console.log(err)
  }
}

  const saveRecord = async () =>{
    try{
      const data = {
        userId: user_id,
        quizId: record.quizId,
        userAnswers: record.userAnswers,
        totalTimeTaken: record.totalTimeTaken,
        score: record.score,
        startTime: record.startTime,
        endTime: record.endTime
      }

      console.log(data)
  
      const response = await fetch('http://localhost:3000/exam/saveRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           "Access-Control-Allow-Origin": '*',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      
  
      if (response.ok) {
        console.log(response);
        upateUser();
        alert('Record saved successfully');

      }
      else if (response.status === 409) {
        alert("User record already exists")}
       else {
        alert('Failed to save record');
      }

    }
    catch(err){
      console.log(err)
    }
    
  }


 


  return (
    <>
      <Header />
      <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full mx-auto box-border pt-[25px] relative mt-[5.9rem]'>
        <div className='border-none bg-white rounded-md p-5 mb-5 justify-between mt-[70px]'
          style={{ boxShadow: '3px 4px 10px rgba(201, 216, 225, .34)' }}>
          <div className='flex flex-wrap items-center mt-[-18px]'>
            <div className=' flex-grow ml-[2px] mr-[14px] mt-[18px]'>
              <span className='text-[1.125rem] leading-6 font-semibold'>
                Example Reasoning Test
              </span>
            </div>
            <div className='flex items-center justify-start flex-wrap mt-[10px] ml-[-14px]'>
              <button className='bg-white ml-[14px] relative items-center justify-center h-[40px] leading-5
               flex mt-2 border rounded-md border-[#dfe6ed] px-[17px] box-border' onClick={saveRecord} >
                <div className='w-[20px] h-fit ml-[-4px] mr-2'>
                  <img src='/icons8-bookmark (1).svg' alt='bookmark' />
                </div>
                <span>Save the result</span>

              </button>
            </div>

          </div>
        </div>
      </div>

      <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full mx-auto box-border relative'>
        <div className='test-card'>

          <span className='text-[.75rem] leading-6 font-semibold uppercase tracking-wider text-[#0f2830] mt-[1px] ml-[4px]'>
            Respondent
          </span>
          <div className='flex mt-5 items-start'>
            <div className='pl-1 pr-[12px] '>
              <div>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.6225 1H7.37622C3.45708 1 1 3.77492 1 7.70184V18.2982C1 22.2251 3.44541 25 7.37622 25H18.6212C22.5533 25 25 22.2251 25 18.2982V7.70184C25 3.77492 22.5533 1 18.6225 1Z" stroke="#0F2830" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0003 16C10.3032 16 8 16.3982 8 17.9929C8 19.5875 10.2886 20 13.0003 20C15.6974 20 18 19.6012 18 18.0071C18 16.4131 15.712 16 13.0003 16Z" stroke="#0F2830" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0003 13C14.6571 13 16 11.6565 16 9.99969C16 8.34287 14.6571 7 13.0003 7C11.3435 7 10 8.34287 10 9.99969C9.99442 11.6509 11.3286 12.9944 12.9792 13H13.0003Z" stroke="#0F2830" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>

            </div>
            <div className='flex flex-grow pr-1 pb-1 '>
              <div className='flex justify-between items-center flex-wrap mt-[-12px] mb-4' >
                <p className='mt-3 text-[1.375rem] leading-6 font-[700] '>{firstName} {lastName} </p>

              </div>

            </div>

          </div>
        </div>
      </div>


      {/* Summary Section */}



      <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full mx-auto box-border relative'>
        <div className='test-card'>
          <span className='text-[.75rem] leading-6 font-semibold uppercase tracking-wider text-[#0f2830] mt-[1px] ml-[4px]'>
            Summary
          </span>
          <div className='flex mt-5 items-start'>
            <div className='pl-1 mr-3'>
              <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 18.5353C16.8027 18.5353 19.7184 17.7268 20 14.4815C20 11.2384 17.9672 11.4469 17.9672 7.46778C17.9672 4.35963 15.0211 0.823242 10.5 0.823242C5.97886 0.823242 3.03283 4.35963 3.03283 7.46778C3.03283 11.4469 1 11.2384 1 14.4815C1.28271 17.739 4.19845 18.5353 10.5 18.5353Z" stroke="#8772C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.1688 21.8994C11.6441 23.5923 9.26577 23.6124 7.72656 21.8994" stroke="#8772C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

            </div>
            <div className='flex-grow pr-1 pb-1'>
              <div className='ml-1'>

                Thank you for taking the test!

              </div>
              {percentage >= 50 ? (
                <p className='mt-4 mb-4'>
                  Congratulations on completing the test!
                </p>
              ) : (
                <p className='mt-4 mb-4 text-red-500'>
                  Sorry, you did not ace the test. Try again next time!
                </p>
              )}

            </div>

          </div>

        </div>


      </div>

      {/* Result Graphs */}

      <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full mx-auto box-border relative'>
        <div className='flex content-between items-stretch gap-4'>
          <div className='flex flex-col flex-grow items-stretch basis-[50%]'>
            <div className='test-card basis-[100%]'>
              <div className='text-[.75rem] leading-4 font-semibold uppercase text-[#0f2830] mt-[1px] ml-[4px]'>Result</div>
              <div className='flex mt-5 items-start'>
                <div className='pl-1 mr-3'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.1539 1H6.84486C3.25232 1 1 3.54368 1 7.14335V16.8566C1 20.4563 3.24162 23 6.84486 23H17.1528C20.7572 23 23 20.4563 23 16.8566V7.14335C23 3.54368 20.7572 1 17.1539 1Z" stroke="#0BC279" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M7.5 12L11 15L17.5 9" stroke="#0BC279" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </div>
                <div className='flex-grow pr-1 pb-1'>
                  <div className='ml-1 font-bold text-[1.375rem] leading-6 text-[#0bc279]'>
                    Test Passed
                  </div>
                  <div className='text-[1rem] leading-6 font-normal mt-[14px] mr-1 mb-2 ml-1'>
                    <p className='mt-4 mb-4'>
                      Your result is available
                    </p>
                  </div>
                  <div className='flex justify-end mt-[-30px]'>
                    <div style={{ width: 200, height: 200, position: 'relative', marginTop: '-45px' }}>
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage.toFixed(1)}% `}

                        styles={buildStyles({
                          textColor: '#014751',
                          pathColor: '#0BC279',
                          trailColor: '#d6d6d6',
                          strokeLinecap: 'round',



                        })} />

                      <div className='absolute bottom-[48px] left-[78px]'>
                        <span className='text-[1rem] leading-4 font-semibold text-[#808e9d]'>
                          {correctQuestions}/{totalQuestions} p.
                        </span>
                      </div>


                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className='flex flex-col flex-grow items-stretch basis-[50%]'>
            <div className='test-card basis-[100%]'>
              <div className='text-[.75rem] leading-4 font-semibold uppercase text-[#0f2830] mt-[1px] ml-[4px]'>Timer</div>
              <div className='flex mt-5 items-start'>
                <div className='pl-1 mr-3'>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.1654 10.9987C20.1654 16.0587 16.0587 20.1654 10.9987 20.1654C5.9387 20.1654 1.83203 16.0587 1.83203 10.9987C1.83203 5.9387 5.9387 1.83203 10.9987 1.83203C16.0587 1.83203 20.1654 5.9387 20.1654 10.9987Z" stroke="#505D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.4002 13.9176L11.5585 12.2217C11.0635 11.9284 10.6602 11.2226 10.6602 10.6451V6.88672" stroke="#505D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <div className='flex-grow pr-1 pb-1'>
                  <div className='ml-1 font-bold text-[1.375rem] leading-6 text-[#0f2830]'>
                    Total time
                  </div>
                  <div className='text-[1.375rem] leading-6 mt-[14px] mr-1 mb-2 ml-1 text-[#0f2830] font-semibold flex gap-3 items-center'>
                    <p className='mt-4 mb-4 ml-1'>
                    {formatTime(record.totalTimeTaken)}
                    {/* {record.totalTimeTaken} */}
                    </p>
                    <span className='text-[1.375rem] leading-6 mt-[14px] mr-1 mb-2 ml-1 font-semibold text-[#aeb9c6]'>
                      <span className=''>
                        /
                      </span>
                      <span className='ml-4'>
                      {formatTime(allTime)}
                        {/* 00:12:00 */}
                      </span>
                    </span>



                  </div>
                  <div className='relative ml-2 w-[95%] h-3 bg-gray-200 rounded-full'>
                    <div
                      className='absolute top-0 left-0 h-3 bg-black rounded-full'
                      style={{ width: `${timeProgress}%` }}
                    ></div>
                    <div
                      className='absolute top-0 h-3 w-3 bg-white border border-black rounded-full'
                      style={{ left: `calc(${timeProgress}% - 8px)` }}
                    ></div>
                  </div>

                  <div className='text-[1rem] leading-6 mt-[40px] mr-1 mb-2 ml-[6px] font-normal flex gap-3 justify-between items-center'>
                    <div className='flex justify-between items-center gap-5'>
                      <p className='text-[16px] leading-6'>Start time</p>
                      <p className='font-bold text-[16px] leading-6'>
                        {formatStartTime(strtTime)}
                        {/* {strtTime} */}
                        </p>
                    </div>
                    <div className='flex justify-between items-center gap-5 pr-[92px]'>
                      <p className='text-[16px] leading-6'>Date</p>
                      <p className='font-bold text-[16px] leading-6' >
                        {formatDate(endTime)}
                        </p>
                    </div>
                  </div>
                  <div className='text-[1rem] leading-6 mt-[20px] mr-1 mb-2 ml-[6px] font-normal flex gap-3 justify-between items-center'>
                    <div className='flex justify-between items-center gap-5'>
                      <p className='text-[16px] leading-6'>End time</p>
                      <p className='font-bold text-[16px] leading-6'>
                        {formatStartTime(endTime)}
                        {/* {endTime} */}
                        </p>
                    </div>

                  </div>

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
      


      <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full mx-auto box-border relative'>
        <QuestionList questions={questions} />
      </div>
      <Footer/>
    </>
  )
}
