import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const navList = [
    { name: "overview", path: "/overview" },
    { name: "expense", path: "/expense" },
    { name: "revenue", path: "/revenue" },
  ];

  return (
    <header className="header">
      <h1 className="logo">F.T</h1>
      <nav>
        <ul>
          {navList.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="navlist"
                style={({ isActive }) => ({
                  color: isActive ? "#F8AE56" : "#FDF8FA",
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="profile">
          <div className="avatar"></div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </nav>
      <div className="menuBar">
        <i className="fa-solid fa-bars" id="open"></i>
        <i className="fa-solid fa-x" id="close"></i>
      </div>
    </header>
  );
};

export default Header;
