import React from "react";
import lebronjamesTrivia from "../assets/portfolio/lebronjamesTrivia.jpg";
import tictac from "../assets/portfolio/tictac.jpg";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: lebronjamesTrivia,
      title: "LeBron James Trivia",
      desc: "21-question trivia game",
      url: "https://naomishiko.github.io/LeBron-James-Trivia/",
    },
    {
      id: 2,
      src: tictac,
      title: "Tic Tac Toe",
      desc: "Trivia game",
      url: "https://naomishiko.github.io/tictac/",
    },
  ];

  return (
    <div name="portfolio" className="w-full bg-transparent py-12 md:py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-12 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-black sm:text-5xl md:text-6xl">
            Portfolio
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40 md:mx-0" />
          <p className="mt-6 font-sans font-light text-ink/70">
            A few things I’ve built
          </p>
        </div>

          <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
            {portfolios.map(({ id, src, title, desc, url }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="work-card group"
              >
                <div className="work-card__media">
                  <span className="work-card__tag">Web Game</span>
                  <img src={src} alt={title} />
                  <span className="work-card__cta">
                    Play
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="font-serif text-xl text-ink">{title}</p>
                  <p className="font-sans text-sm font-light text-ink/60">{desc}</p>
                </div>
              </a>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Portfolio;
