import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navList = [
    { name: "overview", path: "/overview" },
    { name: "expense", path: "/expense" },
    { name: "revenue", path: "/revenue" },
  ];

  return (
    <header className="absolute w-full flex items-center justify-between px-10 py-5 z-20">
      <h1 className="text-red text-4xl font-medium">F.T</h1>
      <nav className="flex gap-4 items-center">
        <ul className="flex gap-4">
          {navList.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="px-2 capitalize hover:text-yellow"
                style={({ isActive }) => ({
                  color: isActive ? "#F8AE56" : "#FDF8FA",
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1 w-16 h-10">
          <div className="w-10 h-full rounded-full bg-grey"></div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
