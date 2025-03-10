import React from 'react'

const Contact = () => {
  return (
    <div name="contact" className="w-full
    bg-gradient-to-b from-red-900 to-black p-4 text-white">
        <div className="flex flex-col p-4 justify-center
        max-w-screen-sm mx-auto"></div> 
            <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-1 border-gray-700 shadow-md shadow-yellow-600 px-5">
                        Contact
                        </p>

                    <p className="py-6">Submit the form below to get in
                     touch with me</p>
                </div>

            <div className="flex justify-center items-center w-full px-4">
                <form action="https://getform.io/f/1d7a354f-ff32-4f8d-862f-83bcc0789a1a" method="POST"
                className="flex flex-col w-full max-w-screen-md">

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
                   from-green-500 to-yellow-400 via-black px-10 py-7 my-8 mx-auto flex 
                   items-center rounded-md hover:scale-110 duration-300 shadow-md shadow-black-900">
                      Get In Touch
                  </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Contact;