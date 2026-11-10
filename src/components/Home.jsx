import React from "react";
import naomishiko from "../assets/naomishiko.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div
      name="home"
      className="relative w-full overflow-hidden bg-transparent md:min-h-screen"
    >
      <div className="pointer-events-none absolute -top-40 right-[-6rem] h-[30rem] w-[30rem] gold-glow" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-[-6rem] h-[24rem] w-[24rem] blush-glow opacity-60" />

      <div className="relative mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center gap-8 px-6 pb-10 pt-24 md:min-h-screen md:flex-row md:gap-16 md:py-0">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="font-serif text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Hello, I&apos;m <span className="font-signature text-ink">Naomi</span>
          </h2>
          <p className="mt-6 max-w-md font-sans text-lg font-light text-ink/70">
            Design, code, and a little sparkle.
          </p>

          <div>
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group mt-9 inline-flex w-fit cursor-pointer items-center rounded-full border border-gold-500/60 bg-gradient-to-r from-gold-300 to-gold-500 px-7 py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-gold transition-transform duration-300 hover:scale-105"
            >
              <BsStars className="mr-2" size={18} />
              View Portfolio
              <span className="ml-2 transition-transform duration-300 group-hover:rotate-90">
                <MdOutlineKeyboardArrowRight size={22} />
              </span>
            </Link>
          </div>
        </div>

        <div className="relative">
          <img
            src={naomishiko}
            alt="Naomi"
            className="blend-photo relative w-60 sm:w-80 md:w-[22rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
