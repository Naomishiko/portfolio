import React from 'react'

const Contact = () => {
  return (
    <div name="contact" className="w-full
    bg-gradient-to-b to-pink-600 from-black via-black p-4 text-white">
        <div className="flex flex-col p-4 justify-center
        max-w-screen-lg mx-auto h-full">
            <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-1 border-gray-700 shadow-md shadow-blue-200 px-5">
                        Contact
                        </p>

                    <p className="py-6">Submit the form below to get in
                     touch with me</p>
                </div>

            <div className="flex justify-center items-center">
                <form action="https://getform.io/f/1d7a354f-ff32-4f8d-862f-83bcc0789a1a" method="POST"
                className="flex flex-col w-full md:w-1/2">

                    <input type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    className="p-2 bg-transparent border-2 rounded-md 
                    text-white focus:outline-none"
                    />

                  <input type="text" 
                  name="email" 
                  placeholder="Enter your email" 
                  className="my-4 p-2 bg-transparent border-2 rounded-md 
                    text-white focus:outline-none"
                    />

                    <textarea 
                    name="message"
                    placeholder="Enter your message"  
                    rows="10" 
                    className="p-2 bg-transparent border-2 rounded-md
                    text-white focus:outline-none">
                  </textarea>

                  <button className="text-white bold bg-gradient-to-t
                   from to-black-300 to-orange-900 px-10 py-7 my-8 mx-auto flex 
                   items-center rounded-md hover:scale-110 duration-300 shadow-md shadow-blue-200">
                      Let's talk
                  </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Contact;