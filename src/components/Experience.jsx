import React from "react";
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
    <div name="experience" className="w-full bg-transparent py-10 md:py-16">
      <div className="mx-auto flex max-w-screen-2xl flex-col px-6 md:px-10">
        <div className="mb-12 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-black sm:text-5xl md:text-6xl">
            Experience
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40 md:mx-0" />
          <p className="mt-6 font-sans font-light text-ink/95">
            Tools and technologies I work with
          </p>
        </div>

        <div className="tech-scene">
          <div className="tech-ring" style={{ "--n": techs.length }}>
            {techs.map(({ id, Icon, title, color }, i) => (
              <div
                key={id}
                className="tech-card shadow-soft"
                style={{
                  "--i": i,
                  borderColor: `${color}66`,
                  backgroundImage: `linear-gradient(180deg, ${color}26, rgba(250, 245, 236, 0.92))`,
                }}
              >
                <Icon
                  size={72}
                  aria-label={title}
                  style={{ color, filter: `drop-shadow(0 6px 14px ${color}59)` }}
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
                />
                <span className="tech-card-label">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
