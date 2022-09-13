import React from "react";
import trust from "../../assets/icons/security.png";
const Verified = () => {
  return (
    <div className='flex justify-center items-center bg-[#1e1e1e] text-white p-2 rounded-md'>
      <img className='h-11 w-11 mr-2' src={trust} alt='shield' /> Powered by
      <a href='https://chain.link/vrf' target='_blank' rel='noreferrer'>
        <span className='ml-1 font-bold cursor-pointer hover:text-[#75ddfd]'>
          Chainlink VRF
        </span>
      </a>
    </div>
  );
};
export default Verified;
