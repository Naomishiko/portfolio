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

  // repeat + duplicate so one loop half is always wider than the viewport
  const base = [...portfolios, ...portfolios, ...portfolios, ...portfolios];
  const slides = [...base, ...base];

  return (
    <div name="portfolio" className="w-full bg-transparent py-10 md:py-16">
      <div className="mx-auto flex max-w-screen-2xl flex-col px-6 md:px-10">
        <div className="mb-12 text-center">
          <p className="font-serif text-4xl font-light text-black sm:text-5xl md:text-6xl">
            Portfolio
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40" />
          <p className="mt-6 font-sans font-light text-ink/95">
            A few things I’ve built
          </p>
        </div>

        <div className="work-scene">
          <div className="work-track">
            {slides.map(({ id, src, title, desc, url }, i) => (
              <a
                key={`${id}-${i}`}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="work-slide"
              >
                <div className="work-slide__media">
                  <img src={src} alt={title} />
                </div>
                <div className="work-slide__body">
                  <p className="font-serif text-xl text-ink">{title}</p>
                  <p className="font-sans text-sm font-light text-ink/85">{desc}</p>
                  <span className="work-slide__cta">
                    Play
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
