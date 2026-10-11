import React from "react";
import { HiOutlineMail } from "react-icons/hi";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
          Mail <HiOutlineMail size={28} />
        </>
      ),
      href: "mailto:njivoon@gmail.com",
    },
  ];

  return (
    <div className="fixed left-0 top-[35%] flex flex-col">
      <ul>
        {links.map(({ id, child, href, download }) => (
          <li
            key={id}
            className="ml-[-100px] flex h-24 w-40 items-center justify-between bg-gradient-to-r from-gold-500 to-blush-500 px-4 duration-300 hover:ml-[-10px] hover:rounded-md"
          >
            <a
              href={href}
              className="flex w-full items-center justify-between font-sans text-sm font-semibold uppercase tracking-widest text-ink"
              download={download}
              target="_blank"
              rel="noreferrer"
            >
              {child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
