import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full bg-transparent py-24"
    >
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-10 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-ink sm:text-5xl md:text-6xl">
            About <span className="accent-text">Me</span>
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40 md:mx-0" />
        </div>
        <div className="mx-auto max-w-3xl space-y-6 text-center font-serif text-xl leading-relaxed text-ink/80 sm:text-2xl md:text-[28px] md:leading-relaxed">
          <p>
            I&apos;m a creative and passionate developer and designer who loves
            building websites, crafting intuitive user experiences, and creating
            visually compelling graphics. I&apos;m driven, energetic, and
            committed to delivering high-quality work, with a strong eye for
            design and attention to detail.
          </p>
          <p>
            I enjoy combining creativity, functionality, and usability to bring
            ideas to life through meaningful digital experiences. I&apos;m always
            eager to learn new technologies, explore innovative ideas, embrace
            new challenges, and continue growing both creatively and technically.
          </p>
          <p>
            My goal is to create aesthetically pleasing, functional, and
            user-friendly digital solutions that leave a lasting impression.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
