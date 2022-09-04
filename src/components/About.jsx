import React from 'react'

const About = () => {
  return (
    <div name="about" className="w-full h-screen bg-gradient-to-b from-pink-900 to-black text-white">
        <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
            <div className="pb-8">
                <p className="text-4xl font-bold inline border-b-4 border-pink-700">About</p>
            </div>
            <p className="text-xl mt-20"> Hello! my name is Naomi, 
             am a proud Kenyan-American full-stack software engineer. My undeniable perseverance, 
        commitment and focus to whatever I set my mind to has always been one of 
        my defining characteristics. My background in the cosmetic industry, and 
        healthcare gave me a strong work ethic, leadership, team collaboration, 
        customer-focused and product management.     
            </p>
            <br />
            <p className="text-xl"> I completed a Software Engineering Immersive certificate from General Assembly,
             and have experience building full stack applications utilizing tools such as HTML/CSS, 
            Javascript, Python, React, MongoDB, Node.js, Express.js, Django, PostgreSQL.
            </p>
        </div>
    </div>
  )
}

export default About;