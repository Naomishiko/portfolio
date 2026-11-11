import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, link: "home" },
    { id: 2, link: "about" },
    { id: 3, link: "portfolio" },
    { id: 4, link: "ugc" },
    { id: 5, link: "experience" },
    { id: 6, link: "contact" },
  ];

  return (
    <div className="fixed z-50 flex h-20 w-full items-center justify-between border-b border-gold-400/40 bg-white/60 px-6 text-ink/95 backdrop-blur">
      <h1 className="font-signature text-4xl leading-none text-gold-500 sm:text-5xl">
        𝓝𝓪𝓸𝓶𝓲
      </h1>

      <ul className="hidden items-center gap-3 md:flex">
        {links.map(({ id, link }) => (
          <li key={id}>
            <Link
              to={link}
              smooth
              duration={500}
              className="nav-gold-btn cursor-pointer px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em]"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        role="button"
        tabIndex={0}
        aria-label="Toggle menu"
        className="cursor-pointer pr-2 z-20 text-gold-500 md:hidden"
      >
        {nav ? <FaTimes size={28} /> : <FaBars size={28} />}
      </div>

      {nav && (
        <ul className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-white/95 to-gold-100/95">
          {links.map(({ id, link }) => (
            <li key={id} className="px-4 py-2">
              <Link
                onClick={() => setNav(false)}
                to={link}
                smooth
                duration={500}
                className="nav-gold-btn cursor-pointer px-8 py-3 font-serif text-2xl capitalize sm:text-3xl"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
