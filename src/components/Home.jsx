import React from "react";
import naomishiko from "../assets/naomishiko.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { Link } from "react-scroll";


const RING_TEXT = "HELLO, I'M NAOMI";
const RING_SECTORS = 30;

const TextRing = () => {
  const chars = Array.from({ length: RING_SECTORS }, (_, i) =>
    i < RING_TEXT.length ? RING_TEXT[i] : ""
  );

  return (
    <div className="text-ring" aria-label={RING_TEXT} role="img">
      {[0, 1].map((ring) => (
        <div className="text-ring__ring" key={ring}>
          {chars.map((ch, i) => (
            <div
              className="text-ring__sector"
              style={{ "--i": i }}
              key={i}
              aria-hidden="true"
            >
              {ch}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


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
          <h2 className="sr-only">Hello, I&apos;m Naomi</h2>
          <TextRing />
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
            className="blend-photo relative w-72 sm:w-[22rem] md:w-[28rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
