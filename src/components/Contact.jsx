import React from "react";

const fieldClass =
  "rounded-xl border-2 border-gold-500 bg-white p-4 text-ink shadow-[0_12px_28px_-12px_rgba(95,69,15,0.7)] placeholder-ink/55 transition-all duration-200 focus:border-gold-600 focus:ring-2 focus:ring-gold-300 focus:outline-none";

const Contact = () => {
  return (
    <div name="contact" className="w-full bg-transparent py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-6 md:px-10">
        <div className="mb-10 text-center">
          <p className="font-serif text-4xl font-light text-black sm:text-5xl md:text-6xl">
            Contact
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40" />
          <p className="mt-6 font-sans font-light text-ink/95">
            Have a project or just want to say hi?
          </p>
        </div>

        <form
          action="https://getform.io/f/1d7a354f-ff32-4f8d-862f-83bcc0789a1a"
          method="POST"
          className="flex w-full flex-col"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className={fieldClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className={`my-5 ${fieldClass}`}
          />
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="8"
            className={fieldClass}
          />

          <button type="submit" className="gold-shine-btn">
            <span>Get In Touch</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
