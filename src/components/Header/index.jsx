import React, { useEffect, useState } from "react";
import { switchToPolygon } from "../../utils/index";
import { ethers } from "ethers";
import rocket from "../../assets/Features/rocket.png";

import openSea from "../../assets/icons/openSea.png";
// import discord from "../../assets/icons/discord.png";
// import twitter from "../../assets/icons/twitter.png";
// import youtube from "../../assets/icons/youtube.png";

const contractAddress = "0x29f3642CBD81104B2EBD8287aBA52351478FD885";

const Header = ({ getData }) => {
  // web3 variables
  const [userAddress, setUserAddress] = useState("");

  // constants
  const shortAddress =
    userAddress?.slice(0, 5) + "..." + userAddress?.slice(-5);

  useEffect(() => {
    if (window.ethereum === undefined) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const getAccounts = async () => {
      try {
        const accounts = await provider.listAccounts();
        console.log("header - length", accounts.length);
        console.log("header - address", accounts[0] === undefined);

        getData(accounts[0]);
        setUserAddress(accounts[0]);
      } catch (error) {
        console.log("get accounts failed");
      }
    };
    getAccounts();
  }, []);

  useEffect(() => {
    if (window.ethereum === undefined) return;
    switchToPolygon();
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log("This account is not connected");
      } else if (accounts[0] !== userAddress) {
        setUserAddress(accounts[0]);
        getData(accounts[0]);
        window.location.reload();
      }
    }
  }, []);

  /**Connects the user to the website */
  const connectWallet = async () => {
    if (window.ethereum === undefined) return console.log("toast notification");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      getData(true);
      setUserAddress(accounts[0]);
      switchToPolygon();
    } catch (error) {
      console.log("error catch");
    }
  };

  return (
    <header className='w-full border-b-2 bg-[#212121] flex flex-col justify-center items-center '>
      <div className='ease-in duration-500  w-full px-2 py-2 sm:py-3  max-w-screen-xl sm:px-6 lg:px-8  '>
        <div className='flex flex-col sm:justify-between gap-5 sm:flex-row items-center'>
          <h1 className='font-bold cursor-pointer text-2xl sm:text-3xl text-white'>
            Logo
          </h1>
          <div className='flex items-center gap-4'>
            <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
              <img className='h-10 w-10' src={openSea} alt='opensea' />
            </a>
            <button
              onClick={connectWallet}
              className='font-opensSans font-extrabold px-5 py-3 text-sm  text-black  rounded-md bg-slate-200 hover:bg-slate-300'
              type='button'>
              {userAddress === "" || userAddress === undefined
                ? "Connect Wallet"
                : shortAddress}
            </button>
          </div>
        </div>
      </div>
      <div className='w-full bg-[#89d0ffad] flex justify-center'>
        <div className='w-full flex flex-col p-3 text-center sm:flex-row gap-3 sm:gap-5 justify-center items-center max-w-screen-xl'>
          <img
            className='hidden sm:inline-flex sm:h-5 sm:w-5'
            src={rocket}
            alt='rocket'
          />
          This is a testnet demo of our NFT Mint Dapp running on Polygon
        </div>
      </div>
    </header>
  );
};
export default Header;
