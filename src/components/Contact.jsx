import React from "react";

const fieldClass =
  "rounded-lg border border-gold-400/25 bg-espresso/60 p-3 text-beige-50 placeholder-beige-500 transition-colors duration-200 focus:border-gold-400 focus:outline-none";

const Contact = () => {
  return (
    <div name="contact" className="w-full bg-gradient-to-b from-ink to-espresso py-24">
      <div className="mx-auto flex max-w-screen-sm flex-col px-6">
        <div className="mb-10 text-center">
          <p className="font-serif text-4xl font-light text-beige-50 sm:text-5xl">
            Cont<span className="text-gold-400">act</span>
          </p>
          <div className="gold-rule mx-auto mt-4 h-px w-40" />
          <p className="mt-6 font-sans font-light text-beige-300">
            Submit the form below to get in touch with me
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
            className={`my-4 ${fieldClass}`}
          />
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="8"
            className={fieldClass}
          />

          <button className="mx-auto mt-8 flex items-center rounded-full border border-gold-300/50 bg-gradient-to-r from-gold-500 to-gold-300 px-10 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-gold transition-transform duration-300 hover:scale-105">
            Get In Touch
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
