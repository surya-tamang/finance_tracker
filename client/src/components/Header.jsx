import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navList = [
    { name: "overview", path: "/overview" },
    { name: "expense", path: "/expense" },
    { name: "revenue", path: "/revenue" },
  ];
  return (
    <header className="flex items-center justify-between px-10 py-5">
      <h1 className="text-red text-4xl font-medium">F.T</h1>
      <section className="flex gap-4 items-center">
        <nav>
          <ul className="flex gap-4">
            {navList.map((item, index) => {
              const { name, path } = item;
              return (
                <NavLink
                  to={path}
                  key={index}
                  className="px-2 capitalize hover:text-yellow"

                >
                  {name}
                </NavLink>
              );
            })}
          </ul>
        </nav>
        <div className=" flex items-center gap-1 w-16 h-10">
          <div className="w-10 h-full rounded-full bg-grey"></div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </section>
    </header>
  );
};

export default Header;
