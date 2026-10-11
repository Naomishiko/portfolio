import React from "react";
import lebronjamesTrivia from "../assets/portfolio/lebronjamesTrivia.jpg";
import tictac from "../assets/portfolio/tictac.jpg";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: lebronjamesTrivia,
      url: "https://taupe-treacle-a736a0.netlify.app/",
    },
    {
      id: 2,
      src: tictac,
      url: "https://spontaneous-brioche-3a4022.netlify.app/",
    },
  ];

  return (
    <div name="portfolio" className="w-full bg-gradient-to-b from-ink to-espresso py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-12 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-beige-50 sm:text-5xl md:text-6xl">
            Port<span className="text-gold-400">folio</span>
          </p>
          <div className="gold-rule mx-auto mt-4 h-px w-40 md:mx-0" />
          <p className="mt-6 font-sans font-light text-beige-300">
            Check out some of my work right here
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {portfolios.map(({ id, src, url }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-gold-400/25 bg-espresso shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/70 hover:shadow-gold"
            >
              <img
                src={src}
                alt="Portfolio project"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
