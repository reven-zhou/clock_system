import React, { useState } from "react";
import backGround from '../public/Business_SVG.svg'
import bgImg from '../img/33.png'

export default function Home() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="relative w-full h-full pb-10">
        <div className="hidden md:block">
          {/* <img className="absolute bg-cover bg-center w-full h-full inset-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/Hero%2008.png" alt /> */}
        </div>
        <nav className="lg:hidden relative z-50">
          <div className="flex py-2 justify-between items-center px-4">
            <div className="visible flex items-center">
              <button id="open" onClick={() => setMenu(!menu)} className={` ${menu ? 'hidden' : ''} focus:outline-none focus:ring-2 focus:ring-black`}>
                {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/large_typography_with_gradient_and_glass_effect_Svg2.svg" alt="menu" /> */}
              </button>
              <div className="xl:hidden">
                <button id="close" className={` ${menu ? '' : 'hidden'} close-m-menu focus:ring-2 focus:ring-black focus:outline-none`} onClick={() => setMenu(!menu)}>
                  {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/large_typography_with_gradient_and_glass_effect_Svg3.svg" alt="close" /> */}
                </button>
              </div>
            </div>
          </div>
        </nav>
        <nav className="f-f-l relative z-10">
          <div className="relative z-10 mx-auto container hidden w-full px-4 xl:px-0 lg:flex justify-between items-center py-11">
          </div>
        </nav>
        <div className="relative px-4 xl:px-0 container mx-auto md:flex items-center gap-8">
          <div className="text-color w-full md:w-1/3 pt-16 lg:pt-32 xl:pt-12">
            <h1 className="text-4xl md:text-4xl lg:text-6xl w-11/12 lg:w-11/12 xl:w-full xl:text-6xl text-gray-900 font-extrabold f-f-l">乐程打卡</h1>
            <div className="f-f-r text-base lg:text-base pb-20 sm:pb-0 pt-10 xl:pt-6">
              <h2>The next big thing starts here. Start building with Prodify and be the first to market with a product that is ready to take on the competition and delight your customers</h2>
            </div>
            <div className="lg:flex">
              <button className="hidden md:block hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4  bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg">Start building now</button>
              <button className="hidden md:block hover:opacity-90 text-base w-full xl:text-base xl:w-4/12 lg:ml-2 xl:ml-2 mt-4 xl:mt-8 f-f-r py-4  bg-indigo-200 text-indigo-600 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg">Try it out</button>
            </div>
          </div>
          <img className="w-full mt-8 md:mt-0 object-fill md:w-2/3 md:-ml-4 lg:-ml-4 xl:ml-0" src={bgImg.src} alt="sample page" role="img" />
          <button className="md:hidden hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4  bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg">Start building now</button>
          <button className="md:hidden hover:opacity-90 text-base w-full xl:text-base xl:w-4/12 xl:ml-2 mt-4 xl:mt-8 f-f-r py-4  bg-indigo-200 text-indigo-600 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg">Try it out</button>
        </div>
      </div>


      <style>{`
      .top-100 {
          animation: slideDown .5s ease-in-out;
      }

      @keyframes slideDown {
          0% {
              top: -50%;
          }

          100% {
              top: 0;
          }
      }

      * {
          outline: none !important;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-tap-highlight-color: transparent;
      } `}</style>
    </>
  );
}
