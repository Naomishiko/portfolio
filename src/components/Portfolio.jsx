import React from 'react';
import lebronjamesTrivia from
 "../assets/portfolio/lebronjamesTrivia.jpg"; 
import tictac from 
"../assets/portfolio/tictac.jpg"; 
import ugc from 
"../assets/portfolio/ugc.jpg"; 

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

{ 
    id: 3, 
    src: ugc, 
    url: "https://naomistudio.net/", 
}, 

]; 

return (
    <div name="portfolio" className="bg-gradient-to-t from-red-900 to-pink-900 via-black w-full
     text-white min-h-screen">
         <div className="p-4 mx-auto flex flex-col
         justify-center w-full h-full">
             <div className="pb-8">
                 <p className="text-3xl sm:text-4xl font-bold inline border-b-2 border-gray-700 shadow-md shadow-yellow-600 px-4 sm:px-5"> 
                 Portfolio</p>
                 <p className="py-6">Check out some of my work right here</p>
             </div>
             
    
             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-0">
             {
                 portfolios.map(({id, src, url}) => (
                    <div key={id} className="shadow-md shadow-pink-700 rounded-lg">
                     <a href={url} target="_blank" rel="noreferrer">
                     <img 
                    src={src}
                     alt="Portfolio project"
                     style={{ display: 'block', width:
                    '100%', height: 'auto' }}
                     
                    className="rounded-md" />
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