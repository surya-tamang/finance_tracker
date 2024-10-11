import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";
import ProfileBox from "./ProfileBox";
import { useSelector } from "react-redux";

import avatar from "../assets/user.png";

const Header = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userInfo);

  const [editProfileBox, setEditProfileBox] = useState(false);
  const navList = [
    { name: "overview", path: "/overview" },
    { name: "expense", path: "/expense" },
    { name: "revenue", path: "/revenue" },
  ];
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [showBox, setShowBox] = useState(false);

  const handleProfile = () => {
    setShowBox(!showBox);
  };

  const handleEditProfileBox = () => {
    setEditProfileBox(!editProfileBox);
  };

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <h1 className="logo">F.T</h1>
      <nav className={`${isNavOpen ? "yesnav" : "nonav"}`}>
        <ul>
          {navList.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="navlist"
                style={({ isActive }) => ({
                  color: isActive ? "#F8AE56" : "#FDF8FA",
                })}
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="profile" onClick={handleProfile}>
          <div className="avatar">
            <img
              src={userData.profile || avatar}
              alt="avatar"
              className="rounded-full h-10 w-10 object-cover"
            />
          </div>
          <i className={`fa-solid fa-angle-${showBox ? "up" : "down"}`}></i>
          <div className="box" style={{ display: showBox ? "flex" : "none" }}>
            <button onClick={handleEditProfileBox}>Edit profile</button>
            <button
              onClick={() => {
                navigate("/");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
              }}
            >
              log out
            </button>
          </div>
        </div>
      </nav>
      <ProfileBox
        visibleBox={editProfileBox}
        handleClick={handleEditProfileBox}
      />
      <div className="menuBar">
        <i
          className="fa-solid fa-bars"
          id="open"
          onClick={handleNav}
          style={{ display: isNavOpen ? "none" : "block" }}
        ></i>
        <i
          className="fa-solid fa-x"
          id="close"
          onClick={handleNav}
          style={{ display: !isNavOpen ? "none" : "block" }}
        ></i>
      </div>
    </header>
  );
};

export default Header;
