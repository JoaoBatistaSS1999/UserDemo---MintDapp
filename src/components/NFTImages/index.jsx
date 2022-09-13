import toast, { Toaster } from "react-hot-toast";

import theme from "../../assets/Features/dark-mode.png";
import tiers from "../../assets/Features/podium.png";
import promo from "../../assets/Features/discounts.png";
import toastIcon from "../../assets/Features/pop-up.png";
import lightning from "../../assets/Features/flash.png";
import validation from "../../assets/Features/validation.png";
import switchIcon from "../../assets/Features/switch.png";
import random from "../../assets/Features/dice.png";

const ConfigPanel = () => {
  const notify = () =>
    toast.success("Hi there! Thanks for visiting our website.", {
      duration: 4000,
      position: "bottom-right",

      // Custom Icon
      icon: "🎉",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });

  return (
    <section className='flex flex-col bg-[#1e1e1e] sm:w-[450px] w-[310px] text-white p-4 rounded-md'>
      <div className='gap-10 flex flex-col'>
        <p>
          <h2 className='text-2xl mb-5'>Contract Features</h2>
          <ul className='gap-2 flex flex-col '>
            <li className='flex items-center gap-4'>
              <img src={tiers} className='h-8 w-8' alt='/' /> Different tiers -
              Multiple levels of rarity
            </li>
            <li className='flex items-center gap-4'>
              <img src={promo} className='h-8 w-8' alt='/' /> Promo system - eg.
              First 100 NFTs minted have a 40% discount
            </li>
            <li className='flex items-center gap-4'>
              <img src={random} className='h-8 w-8' alt='/' /> Random - trustful
              random number powered by Chainlink
            </li>
            <li className='flex items-center gap-4'>
              <img src={lightning} className='h-8 w-8' alt='/' /> Polygon - low
              fees and fast transactions on Polygon
            </li>
          </ul>
        </p>

        <p>
          <h2 className='text-2xl mb-5'>User experience</h2>
          <button onClick={notify}> notify</button>

          <ul className='gap-2 flex flex-col'>
            <li className='flex items-center gap-4'>
              <img src={toastIcon} className='h-8 w-8' alt='/' />{" "}
              <span
                className='cursor-pointer selection:bg-none'
                onClick={notify}>
                Pop-ups - Notifications to show the user what is happening on
                the background. Click me 👈
              </span>
            </li>
            <li className='flex items-center gap-4'>
              <img src={validation} className='h-8 w-8' alt='/' /> Validation -
              Real time form validation based on funds vs total price
            </li>
            <li className='flex items-center gap-4'>
              <img src={switchIcon} className='h-8 w-8' alt='/' /> Network
              switching - automatic network switching to avoid error during
              request{" "}
            </li>
            <li className='flex items-center gap-4'>
              <img src={theme} className='h-8 w-8' alt='/' /> Theme - Dark and
              white variantions
            </li>
          </ul>
        </p>
      </div>

      <Toaster />
    </section>
  );
};

export default ConfigPanel;
