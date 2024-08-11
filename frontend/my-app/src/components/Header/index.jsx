import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ timeLeft}) => {
  const location = useLocation();
  const isAuthScreen = location.pathname === '/login' || location.pathname === '/signup';
  const isTestScreen = location.pathname === '/test';
  const isHomeScreen = location.pathname === '/';

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/allData');
  }

  return (
    <header
      style={{ boxShadow: '3px 4px 10px rgba(36, 50, 57, 0.03)' }}
      className={`bg-white border-b border-gray-200 w-full flex items-center ${isAuthScreen ? 'h-[57px]' : 'fixed top-0 z-10 h-[71px]'}`}
    >
      <div className={`container lg:mx-auto 2xl:pl-[200px] 2xl:pr-[200px] ${isAuthScreen ? 'flex justify-center' : 'flex justify-between'}`}>
        <span className={`h-8`}>
          <img src='/testportal-logo.svg' alt="Logo" className="w-auto h-[30px]" />
        </span>
        {isTestScreen && timeLeft !== undefined && (
          <span className='text-[1rem] leading-6 font-normal text-gray-600 tracking-wider'>
            Time to answer:
            <span className='text-green-500 ml-1'>
              {Math.floor(timeLeft / 3600)} h {Math.floor((timeLeft % 3600) / 60)} min {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60} sec
            </span>
          </span>
        )}
        {isHomeScreen && (
          <div className='flex items-center flex-wrap'>
            <button 
              className='bg-white ml-[14px] relative items-center justify-center  leading-5 flex mt-2 px-[17px] box-border' 
              onClick={handleNavigate} 
            >
              <div className='w-[20px] h-fit ml-[-4px] mr-2'>
                <img src='/icons8-bookmark (1).svg' alt='bookmark' />
              </div>
              <span>Show all Record</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
