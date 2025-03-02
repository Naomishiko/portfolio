import React from 'react'
import lebronjamesTrivia from "../assets/portfolio/lebronjamesTrivia.jpg"
import tictac from "../assets/portfolio/tictac.jpg"


const Portfolio = () => {

    const portfolios = [
        {
        id: 1,
        src: lebronjamesTrivia,
        url: "https://taupe-treacle-a736a0.netlify.app/",
        
    },

    {
        id: 2,
        src: tictac,
        url: "https://spontaneous-brioche-3a4022.netlify.app/",

    },


]

  return (
    <div name="portfolio" className="bg-gradient-to-t from-red-900 to-pink-900 via-black w-full
     text-white md:h-screen">
         <div className="p-4 mx-auto flex flex-col
         justify-center w-full h-full">
             <div className="pb-8">
                 <p className="text-4xl font-bold inline border-b-1 border-gray-700 shadow-md shadow-yellow-600 px-5"> 
                 Portfolio</p>
                 <p className="py-6">Check out some of my work right here</p>
             </div>
             
    
             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
             {
                 portfolios.map(({id, src, url}) => (
                    <div key={id}className="shadow-md shadow-pink-700 rounded-lg">
                     <a href={url}>
                     <img 
                    src={src}
                     alt="https://github.com/naomishiko"
                     
                    className="rounded-md duration-200 hover:scale-105" />
                    <div className="flex items-center justify-center">
                        <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                            </button>
                        <button  className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                            </button>
                    </div>
                    </a>
                    </div>
                
                 ))
             }    
             </div>
         </div>
    </div>
  );
};

export default Portfolio;