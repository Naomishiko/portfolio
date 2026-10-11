import React from "react";
import html from "../assets/html.png";
import css from "../assets/css.png";
import github from "../assets/github.png";
import javascript from "../assets/javascript.png";
import mongoDB from "../assets/mongoDB.png";
import node from "../assets/node.png";
import vscode from "../assets/vscode.png";
import canva from "../assets/canva.png";

const Experience = () => {
  const techs = [
    { id: 1, src: github, title: "GitHub" },
    { id: 2, src: html, title: "HTML" },
    { id: 3, src: css, title: "CSS" },
    { id: 4, src: javascript, title: "JavaScript" },
    { id: 5, src: mongoDB, title: "MongoDB" },
    { id: 6, src: node, title: "Node" },
    { id: 7, src: vscode, title: "VSCode" },
    { id: 8, src: canva, title: "Canva" },
  ];

  return (
    <div name="experience" className="w-full bg-gradient-to-b from-espresso to-ink py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-12 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-beige-50 sm:text-5xl md:text-6xl">
            Exper<span className="text-gold-400">ience</span>
          </p>
          <div className="gold-rule mx-auto mt-4 h-px w-40 md:mx-0" />
          <p className="mt-6 font-sans font-light text-beige-300">
            Technologies I have worked with
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-3 md:grid-cols-4">
          {techs.map(({ id, src, title }) => (
            <div
              key={id}
              className="group flex flex-col items-center rounded-2xl border border-gold-400/20 bg-beige-50 px-4 py-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-gold"
            >
              <img src={src} alt={title} className="h-16 w-16 object-contain" />
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
