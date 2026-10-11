import React from "react";
import {
  SiCanva,
  SiCss3,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiVisualstudiocode,
} from "react-icons/si";

const Experience = () => {
  const techs = [
    { id: 1, Icon: SiGithub, title: "GitHub" },
    { id: 2, Icon: SiHtml5, title: "HTML" },
    { id: 3, Icon: SiCss3, title: "CSS" },
    { id: 4, Icon: SiJavascript, title: "JavaScript" },
    { id: 5, Icon: SiMongodb, title: "MongoDB" },
    { id: 6, Icon: SiNodedotjs, title: "Node" },
    { id: 7, Icon: SiVisualstudiocode, title: "VSCode" },
    { id: 8, Icon: SiCanva, title: "Canva" },
    { id: 9, Icon: SiReact, title: "React" },
    { id: 10, Icon: SiPython, title: "Python" },
  ];

  return (
    <div name="experience" className="w-full bg-gradient-to-b from-espresso to-ink py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-12 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-beige-50 sm:text-5xl md:text-6xl">
            Exper<span className="accent-text">ience</span>
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40 md:mx-0" />
          <p className="mt-6 font-sans font-light text-beige-300">
            Technologies I have worked with
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-3 md:grid-cols-4">
          {techs.map(({ id, Icon, title }) => (
            <div
              key={id}
              className="group flex flex-col items-center rounded-2xl border border-gold-400/20 bg-beige-50 px-4 py-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-blush-400/60 hover:shadow-blush"
            >
              <Icon
                size={64}
                aria-label={title}
                className="h-16 w-16 text-espresso transition-colors duration-300 group-hover:text-blush-500"
              />
              <p className="mt-5 font-sans text-sm font-semibold uppercase tracking-widest text-espresso">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
