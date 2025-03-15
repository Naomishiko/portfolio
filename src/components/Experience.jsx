import React from "react";
import html from "../assets/html.png";
import css from "../assets/css.png";
import github from "../assets/github.png";
import javascript from "../assets/javascript.png";
import mongoDB from "../assets/mongoDB.png";
import node from "../assets/node.png";
import vscode from "../assets/vscode.png";
import canva from "../assets/canva.png";




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
            style: 'shadow-pink-500'
        },



        {
            id: 5,
            src: mongoDB,
            title: 'mongoDB',
            style: 'shadow-orange-500'
        },


        {
            id: 6,
            src: node,
            title: 'NODE',
            style: 'shadow-green-500'
        },


        {   id: 7,
            src: vscode,
            title: 'VSCode',
            style: 'shadow-green-500'
        },


        {   id: 8,
            src: canva,
            title: 'Canva',
            style: 'shadow-white-500'
        },

    
    ]



  return (
  <div 
  name="experience" 
  className="bg-gradient-to-b 
  from-red-900 to-red-900 via-black w-full h-screen">

        <div className="max-w-screen-lg mx-auto p-4 flex flex-col
        justify-items-center text-white">
            <div>
                <p className="text-4xl font-bold inline border-b-1 border-gray-700 shadow-md shadow-yellow-600 px-5">
                Experience
                </p>
                <p className="py-6">Technologies I have 
                worked with</p>
             </div>
             <div className="w-full grid grid-cols-2 sm:grid-cols-3 
             gap-8 text-center py-8 px-12 sm:px-0">

            {
                techs.map(({id, src, title, style}) => (
                    <div key={id} className={`shadow-md
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