import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, link: "home" },
    { id: 2, link: "about" },
    { id: 3, link: "portfolio" },
    { id: 4, link: "experience" },
    { id: 5, link: "appointment" },
  ];

  return (
    <div className="fixed z-50 flex h-20 w-full items-center justify-between border-b border-gold-400/20 bg-ink/90 px-6 text-beige-100 backdrop-blur">
      <h1 className="font-signature text-4xl leading-none text-gold-400 sm:text-5xl">
        Naomi
      </h1>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li key={id} className="px-4">
            <Link
              to={link}
              smooth
              duration={500}
              className="cursor-pointer font-sans text-sm font-medium uppercase tracking-[0.2em] text-beige-200 transition-colors duration-200 hover:text-gold-400"
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
        className="cursor-pointer pr-2 z-20 text-gold-400 md:hidden"
      >
        {nav ? <FaTimes size={28} /> : <FaBars size={28} />}
      </div>

      {nav && (
        <ul className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-ink to-espresso">
          {links.map(({ id, link }) => (
            <li key={id} className="px-4 py-4">
              <Link
                onClick={() => setNav(false)}
                to={link}
                smooth
                duration={500}
                className="cursor-pointer font-serif text-3xl capitalize text-beige-100 transition-colors duration-200 hover:text-gold-400 sm:text-4xl"
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
