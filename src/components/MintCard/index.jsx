import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import abi from "../../contracts/abi.json";
import usdcAbi from "../../contracts/usdcAbi.json";
import Loading from "../Loading/index";

const MintCard = ({ signerState }) => {
  console.log("card - address", signerState === undefined);
  const contractAddress = "0x7952B7089796593E9E35e7E3363C5973A98D79C4";
  const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

  const [inputValue, setInputValue] = useState(1);
  const [userBalance, setUserBalance] = useState(null);
  const [discountSupply, setDiscountSupply] = useState();
  const price = discountSupply > 0 ? 800 : 1000;
  // const price = 1;

  const [loadingMessage, setLoadingMessage] = useState("Loading 11...");
  const [isLoading, setIsLoading] = useState(false);

  const total = inputValue * price;
  const validOperation = !signerState || total > userBalance;

  const subtractInputValue = () => {
    if (inputValue === 1) return;
    setInputValue((prevState) => prevState - 1);
    console.log("subtract");
  };

  const addInputValue = () => {
    if (inputValue === 9) return;
    setInputValue((prevState) => prevState + 1);
    console.log("add");
  };

  const setMaxImputAmount = () => {
    setInputValue(9);
  };

  useEffect(() => {
    if (window.ethereum === undefined) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const readonlyNFTContract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    console.log(readonlyNFTContract);

    const discountNftsLeft = async () => {
      const totalNfts = await readonlyNFTContract.discountedTokensLeft();
      const formatedSupply = ethers.utils.formatUnits(totalNfts, 0);
      console.log(formatedSupply);
      setDiscountSupply(formatedSupply);
    };
    discountNftsLeft();
  }, []);

  useEffect(() => {
    if (window.ethereum === undefined) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const readOnlyUSDCContract = new ethers.Contract(
      usdcAddress,
      usdcAbi,
      provider
    );

    const getUserBalance = async () => {
      console.log();
      if (signerState === undefined) return console.log("fail to get balance");

      const balance = await readOnlyUSDCContract.balanceOf(signerState);
      const rawBalance =
        Number(ethers.utils.formatUnits(balance, 0)) / Math.pow(10, 6);
      const formatedUserBalance = rawBalance.toFixed(2);
      console.log(formatedUserBalance);
      setUserBalance(formatedUserBalance);
      console.log(formatedUserBalance);
    };
    getUserBalance(); // problem with ens?
  }, [signerState]);

  const mintNft = async () => {
    if (window.ethereum === undefined) return;
    try {
      setLoadingMessage("Waiting for confirmation");
      setIsLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const mintContract = new ethers.Contract(contractAddress, abi, signer);
      const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, signer);

      const usdcBuyAmount = price * inputValue;

      const approve = await usdcContract.approve(
        contractAddress,
        ethers.utils.parseUnits(`${usdcBuyAmount}`, 6)
      );
      setLoadingMessage("Approving USDC");
      await approve.wait();

      setLoadingMessage("Generating random number and minting NFT");
      const mintNft = await mintContract.requestRandomWords(`${inputValue}`);
      await mintNft.wait();

      // calback function
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      // kill loading
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-fit font-opensSans'>
      <div className='rounded-lg flex flex-col shadow-lg text-white bg-[#1E1E1E] h-[450px] w-auto sm:w-[400px] max-w-md text-center'>
        <div className='p-6 h-full flex flex-col gap-5 justify-start items-center'>
          <div className=' w-full flex flex-col justify-start items-center'>
            <h5 className='text-xl font-medium'>Mint NFT</h5>
            <p className='text-base mb-4'>10,000</p>
          </div>

          {/* inputs and balances */}

          <div className='flex flex-col gap-5 items-center w-full'>
            <div className='w-full gap-5'>
              {/* usdc balance */}
              <div className='flex border-b-[1px] text-start justify-between items-center'>
                <h2 className='text-white font-light text-lg '>Balance</h2>
                <h4 className='text-[14px] '>
                  USDC {userBalance === null ? "0.00" : userBalance}
                </h4>
              </div>

              {/* input */}
              <div className=' w-full flex justify-between items-center'>
                <h3>Amount</h3>
                <div className='inline-flex items-center my-7 '>
                  <button
                    onClick={subtractInputValue}
                    className='bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M20 12H4'
                      />
                    </svg>
                  </button>
                  <div className='bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none'>
                    {inputValue}
                  </div>
                  <button
                    onClick={addInputValue}
                    className='bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={setMaxImputAmount}
                  className='bg-white text-black px-2 py-1 h-fit rounded-sm'>
                  Max
                </button>
              </div>

              {/* total */}
              <div className='flex border-b-[1px] text-start justify-between items-center'>
                <h2 className='text-white font-light text-lg '>Total</h2>
                <h4 className='text-[14px] '>USDC {total.toFixed(2)}</h4>
              </div>
            </div>
            <div className='w-full gap-2 flex flex-col'>
              <button
                onClick={mintNft}
                type='button'
                disabled={validOperation}
                className='w-full py-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#2fbaf1] text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#289fce] hover:shadow-lg focus:bg-[#289fce] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#289fce] active:shadow-lg transition duration-150 ease-in-out'>
                {validOperation ? "unavailable" : "Mint"}
              </button>

              {userBalance === null
                ? null
                : total > userBalance && (
                    <h3 className='text-red-400 text-sm'>Not enough funds!</h3>
                  )}
            </div>
          </div>
        </div>

        <div className='py-3 px-6 text-sm border-t border-gray-300 '>
          <a href=''></a>
          Not enough funds? Get some{" "}
          <span className='text-[#69bbf1] hover:text-[#3bd1ff]  cursor-pointer'>
            testnet USDC here
          </span>
          {/* https://calibration-faucet.filswan.com/#/dashboard */}
        </div>
      </div>
      {isLoading && <Loading message={loadingMessage} />}
    </div>
  );
};
export default MintCard;
