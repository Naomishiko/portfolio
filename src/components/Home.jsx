import React from "react";
import naomishiko from "../assets/naomishiko.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div
      name="home"
      className="relative min-h-screen w-full overflow-hidden bg-ink"
    >
      <div className="pointer-events-none absolute -top-40 right-[-6rem] h-[30rem] w-[30rem] gold-glow" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-[-6rem] h-[24rem] w-[24rem] gold-glow opacity-60" />

      <div className="relative mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-center gap-12 px-6 py-28 md:flex-row md:gap-16 md:py-0">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="font-serif text-5xl font-light leading-[1.05] text-beige-50 sm:text-6xl md:text-7xl">
            Hello, I&apos;m <span className="text-gold-400">Naomi</span>
          </h2>
          <p className="mt-6 max-w-md font-sans text-lg font-light text-beige-300">
            Design meets creativity.
          </p>

          <div>
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group mt-9 inline-flex w-fit cursor-pointer items-center rounded-full border border-gold-300/50 bg-gradient-to-r from-gold-500 to-gold-300 px-7 py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-gold transition-transform duration-300 hover:scale-105"
            >
              View Portfolio
              <span className="ml-2 transition-transform duration-300 group-hover:rotate-90">
                <MdOutlineKeyboardArrowRight size={22} />
              </span>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -m-4 rounded-[2rem] border border-gold-400/30" />
          <img
            src={naomishiko}
            alt="Naomi"
            className="relative w-56 rounded-[1.75rem] shadow-soft sm:w-72 md:w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
