import { useState } from "react";

import NFTImages from "./components/NFTImages";
import Header from "./components/Header";
import MintCard from "./components/MintCard";
import Verified from "./components/Verified";

const App = () => {
  const [signer, setSigner] = useState();

  const getUserData = (signer) => {
    setSigner(signer);
  };

  return (
    <div className='min-h-screen flex flex-col items-center '>
      <Header getData={getUserData} />

      <section className=' w-full pt-24 items-start min-h-[calc(100vh-80px)] px-3 py-3 lg:max-w-screen-xl gap-4 flex flex-wrap justify-around '>
        <div className='flex flex-col gap-4'>
          <MintCard signerState={signer} />
          <Verified />
        </div>
        <div>
          <NFTImages />
          {/* <div>
            Secure randon number powered by Chainlink VRF, no sketchy scripts
            running on the background.
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default App;
