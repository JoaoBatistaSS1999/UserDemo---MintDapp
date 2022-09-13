import React from "react";

const Loading = ({ message }) => {
  return (
    <div className='fixed z-10 bg-[#16161694] flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-screen'>
      <div className='flex flex-col justify-center items-center space-x-1 text-lg text-white'>
        <svg
          fill='none'
          className='w-14 h-14 animate-spin'
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            clipRule='evenodd'
            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </svg>
        <div>{message}</div>
      </div>
    </div>
  );
};
export default Loading;
