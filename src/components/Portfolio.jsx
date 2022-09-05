import React from 'react'
import lebronjamesTrivia from "../assets/portfolio/lebronjamesTrivia.jpg";
import njivoshiMERN from "../assets/portfolio/njivoshiMERN.jpg";
import groupPortfolio from "../assets/portfolio/groupPortfolio.jpg";
// import reactParallax from "../assets/portfolio/reactParallax.jpg";
// import reactSmooth from "../assets/portfolio/reactSmooth.jpg";
// import reactWeather from "../assets/portfolio/reactWeather.jpg";

const Portfolio = () => {

    const portfolios = [
        {
        id: 1,
        src: lebronjamesTrivia
    },

    {
        id: 2,
        src: njivoshiMERN
    },


    {
        id: 3,
        src: groupPortfolio
    },



]

  return (
    <div name="portfolio" className="bg-gradient-to-t from-black to-pink-900 w-full
     text-white md:h-screen">
         <div className="p-4 mx-auto flex flex-col
         justify-center w-full h-full">
             <div className="pb-8">
                 <p className="text-4xl font-bold inline border-b-4 border-gray-900"> 
                 Portfolio</p>
                 <p className="py-6">Check out some of my work right here</p>
             </div>
             
    
             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
             {
                 portfolios.map(({id, src}) => (
                    <div key={id}className="shadow-md shadow-orange-500 rounded-lg">
                    <img 
                    src={src}
                     alt="" 
                    className="rounded-md duration-200 hover:scale-105" />
                    <div className="flex items-center justify-center">
                        
                        <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                            </button>
                        <button  className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                            </button>
                    </div>
                    </div>
                 ))
             }    
             </div>
         </div>
    </div>
  );
};

export default Portfolio;