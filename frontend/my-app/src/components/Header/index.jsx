// import React from 'react';
// import { useLocation } from 'react-router-dom';



// const Header = ({ timeLeft }) => {
//   const location = useLocation();
//   const isAuthScreen = location.pathname === '/login' || location.pathname === '/signup';
//   const isTestScreen = location.pathname === '/test';

//   return (
//     <header 
//     style={{ boxShadow: '3px 4px 10px rgba(36, 50, 57, 0.03)' }}
//     className={`bg-white border-b border-gray-200 w-full flex items-center ${isAuthScreen ? 'h-[57px]': 'fixed z-10 h-[71px]'}  `}>
//       <div className={`container lg:mx-auto 2xl:pl-[186px] 2xl:pr-[186px] ${isAuthScreen ? 'flex justify-center' : 'flex justify-start'}`}>
//         <span className={`h-8 ${!isAuthScreen}`}>
//           <img src='/testportal-logo.svg' alt="Logo" className="w-auto h-[30px]"/>
//         </span>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({ timeLeft }) => {
  const location = useLocation();
  const isAuthScreen = location.pathname === '/login' || location.pathname === '/signup';
  const isTestScreen = location.pathname === '/test';

  return (
    <header
      style={{ boxShadow: '3px 4px 10px rgba(36, 50, 57, 0.03)' }}
      className={`bg-white border-b border-gray-200 w-full flex items-center ${isAuthScreen ? 'h-[57px]' : 'fixed top-0  z-10 h-[71px]'}`}
    >
      <div className={`container lg:mx-auto 2xl:pl-[186px] 2xl:pr-[186px] ${isAuthScreen ? 'flex justify-center' : 'flex justify-between'}`}>
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
      </div>
    </header>
  );
};

export default Header;
