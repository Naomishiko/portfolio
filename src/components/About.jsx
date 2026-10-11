import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full bg-gradient-to-b from-ink via-espresso to-ink py-24"
    >
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-10 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-beige-50 sm:text-5xl md:text-6xl">
            About <span className="text-gold-400">Me</span>
          </p>
          <div className="gold-rule mx-auto mt-4 h-px w-40 md:mx-0" />
        </div>
        <p className="mx-auto max-w-3xl text-center font-serif text-xl leading-relaxed text-beige-200 sm:text-2xl md:text-[28px] md:leading-relaxed">
          A creative person who loves building websites, designing user
          experiences, and making graphics. I&apos;m passionate, driven,
          energetic, and committed to delivering high-quality results.
          Dedicated to delivering aesthetically pleasing solutions.
        </p>
      </div>
    </div>
  );
};

export default About;
