import React from "react";
import CodingArt from "./CodingArt";
import {
  SiCanva,
  SiCss3,
  SiDjango,
  SiExpress,
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
    { id: 1, Icon: SiGithub, title: "GitHub", color: "#6e5494" },
    { id: 2, Icon: SiHtml5, title: "HTML", color: "#E34F26" },
    { id: 3, Icon: SiCss3, title: "CSS", color: "#1572B6" },
    { id: 4, Icon: SiJavascript, title: "JavaScript", color: "#F7DF1E" },
    { id: 5, Icon: SiMongodb, title: "MongoDB", color: "#47A248" },
    { id: 6, Icon: SiNodedotjs, title: "Node", color: "#5FA04E" },
    { id: 7, Icon: SiVisualstudiocode, title: "VSCode", color: "#007ACC" },
    { id: 8, Icon: SiCanva, title: "Canva", color: "#00C4CC" },
    { id: 9, Icon: SiReact, title: "React", color: "#61DAFB" },
    { id: 10, Icon: SiPython, title: "Python", color: "#3776AB" },
    { id: 11, Icon: SiDjango, title: "Django", color: "#092E20" },
    { id: 12, Icon: SiExpress, title: "Express", color: "#3C3C3C" },
  ];

  return (
    <div name="experience" className="w-full bg-gradient-to-b from-espresso/70 to-ink/70 py-24">
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

        <div className="mb-14 flex justify-center">
          <CodingArt className="w-72 max-w-full drop-shadow-[0_18px_40px_rgba(222,155,126,0.35)] sm:w-80 md:w-96" />
        </div>

        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-3 md:grid-cols-4">
          {techs.map(({ id, Icon, title, color }) => (
            <div
              key={id}
              className="group flex flex-col items-center rounded-2xl border border-gold-400/20 bg-beige-50 px-4 py-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-gold"
            >
              <Icon
                size={64}
                aria-label={title}
                style={{ color }}
                className="h-16 w-16 drop-shadow-[0_3px_6px_rgba(46,35,12,0.25)] transition-transform duration-300 group-hover:scale-110"
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
