import React from "react";
import naomishiko from "../assets/naomishiko.png";
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

      <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-8 px-6 md:px-10 pb-10 pt-24 md:min-h-screen md:flex-row md:gap-16 md:py-0">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="sr-only">Hello, I&apos;m Naomi</h2>
          <TextRing />
          <p className="mt-6 max-w-lg font-sans text-xl font-light text-ink/95 sm:text-2xl md:text-[1.75rem]">
            Design, code, and a little sparkle.
          </p>

          <div className="home-cta">
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="gold-shine-btn cursor-pointer"
            >
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>

        <div className="relative xl:translate-x-[30%]">
          <div className="rounded-xl border-2 border-gold-500 bg-white p-3 shadow-[0_12px_28px_-12px_rgba(95,69,15,0.7)]">
            <img
              src={naomishiko}
              alt="Naomi"
              className="w-72 rounded-lg sm:w-[22rem] md:w-[28rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
