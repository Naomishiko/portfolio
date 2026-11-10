import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full bg-transparent py-10 md:py-16"
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col px-6 md:px-10">
        <div className="mb-10 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-black sm:text-5xl md:text-6xl">
            About Me
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40 md:mx-0" />
        </div>
        <div className="mx-auto max-w-4xl space-y-6 text-center font-serif text-[12.59px] leading-relaxed text-ink/95 sm:text-[15.08px] md:text-[17.65px] md:leading-relaxed">
          <p>
            Hi, I&apos;m Naomi, a creative developer and designer.
          </p>
          <p>
            I build websites that feel as good as they look, from the first pixel
            to the final interaction. I care about the details: the spacing, the
            motion, the small moments that make a page feel alive. And I care
            about the people using what I make, so every decision starts with them.
          </p>
          <p>
            I love where design and code meet: where a sketch becomes a layout, a
            layout becomes an interface, and an interface becomes something people
            genuinely enjoy using. Whether it&apos;s a clean landing page, a playful
            game, or a brand&apos;s visual identity, I bring the same energy and care
            to every project.
          </p>
          <p>
            I also make UGC content for skincare, makeup, and lifestyle brands,
            and I enjoy making videos and editing.
          </p>
          <p>
            I&apos;m always learning something new: a framework, a tool, a better way
            to solve a problem. I&apos;m happiest when an idea turns into
            something real. Have an idea? I&apos;d love to help bring it to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
