import React from 'react'

const About = () => {
  return (
    <div name="about" className="w-full min-h-screen bg-gradient-to-t to-orange-900 from-red-900 via-black text-white">
        <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
            <div className="pb-8">
                <p className="text-4xl sm:text-5xl md:text-7xl font-bold inline border-b-2 border-gray-100 shadow-md shadow-purple-200 px-4 sm:px-9">About Me</p>
            </div>
            <p className="text-base sm:text-2xl md:text-[39px] mt-8 md:mt-20">
            A creative person who loves building websites, designing user experiences, and making graphics. I'm passionate, driven, energetic, and committed
            to delivering high-quality results. Dedicated to delivering aesthetically pleasing solutions.    
            </p>
        </div>
    </div>
  )
}

export default About;