import React, { useState } from "react";

const Navbar = ({}) => {
  return (
    <nav className="flex justify-around items-center w-full py-5 absolute text-center">
      <span className="text-sm">
        Back-end (Java):{" "}
        <a
          href={"https://github.com/marcinbator"}
          target={"_blank"}
          className="text-orange-600 underline"
        >
          Marcin Bator
        </a>
      </span>
      <h1 className="font-bold text-1xl md:text-2xl">Bridge problem</h1>
      <span className="text-sm">
        Front-end (Next.js):{" "}
        <a
          href={"https://github.com/ZegarekPL"}
          target={"_blank"}
          className="text-cyan-400 underline"
        >
          Wiktor Mazur
        </a>
      </span>
    </nav>
  );
};

export default Navbar;
