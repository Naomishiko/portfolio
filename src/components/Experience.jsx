import React from "react";
import html from "../assets/html.png";
import css from "../assets/css.png";
import github from "../assets/github.png";
import reactImage from "../assets/react.png";
import javascript from "../assets/javascript.png";
import mongoDB from "../assets/mongoDB.png";
import node from "../assets/node.png";
import pythonLogo from "../assets/pythonLogo.png";
import jQuery from "../assets/jQuery.png";
import tailwind from "../assets/tailwind.png";
import heroku from "../assets/heroku.png";
import postman from "../assets/postman.png";


const Experience = () => {

    const techs = [
        {
            id: 1,
            src: github,
            title: 'GitHub',
            style: 'shadow-gray-400'
        },

        {
            id: 2,
            src: html,
            title: 'HTML',
            style: 'shadow-orange-500'
        },

        {
            id: 3,
            src: css,
            title: 'CSS',
            style: 'shadow-blue-500'
        },

        {
            id: 4,
            src: javascript,
            title: 'JavaScript',
            style: 'shadow-yellow-500'
        },

        {
            id: 10,
            src: pythonLogo,
            title: 'Python',
            style: 'shadow-yellow-500'
        },

        {
            id: 5,
            src: reactImage,
            title: 'React',
            style: 'shadow-blue-600'
        },

        {
            id: 6,
            src: tailwind,
            title: 'Tailwind',
            style: 'shadow-sky-500'
        },

        {
            id: 7,
            src: jQuery,
            title: 'jQuery',
            style: 'shadow-blue-500'
        },

        {
            id: 8,
            src: mongoDB,
            title: 'mongoDB',
            style: 'shadow-green-500'
        },

        {
            id: 9,
            src: node,
            title: 'NODE',
            style: 'shadow-green-500'
        },



        {
            id: 10,
            src: heroku,
            title: 'Heroku',
            style: 'shadow-purple-500'
        },

        {
            id: 10,
            src: postman,
            title: 'Postman',
            style: 'shadow-orange-500'
        },


    ]



  return (
  <div 
  name="experience" 
  className="bg-gradient-to-b 
  from-red-900 to-red-900 via-black w-full h-screen">

        <div className="max-w-screen-lg mx-auto p-4 flex flex-col
        justify-center w-full h-full text-white">
            <div>
                <p className="text-4xl font-bold inline border-b-1 border-gray-700 shadow-md shadow-blue-200 px-5">
                Experience
                </p>
                <p className="py-6">Technologies I have 
                worked with</p>
             </div>
             <div className="w-full grid grid-cols-2 sm:grid-cols-3 
             gap-8 text-center py-8 px-12 sm:px-0">

            {
                techs.map(({id, src, title, style}) => (
                    <div key={id} className={`shadow-md hover:scale-105 duration-500
                    py-2 rounded-lg ${style}`}>
                   <img src={src} alt="" className="w-20 mx-auto"/>
                   <p className="mt-4">{title}</p>
                   </div>
    ))
}
                   </div>
               </div>
           </div>  
            

             
  );
};

export default Experience