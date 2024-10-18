import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";
import ProfileBox from "./ProfileBox";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../assets/user.png";
import ManagePwd from "./ManagePwd";
import { clearUser } from "../redux/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userInfo);

  const [editProfileBox, setEditProfileBox] = useState(false);
  const [managePwd, setManagePwd] = useState(false);
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
    !editProfileBox
      ? document.body.classList.add("no_scroll")
      : document.body.classList.remove("no_scroll");
  };

  const handleManangePwd = () => {
    setManagePwd(!managePwd);
    !managePwd
      ? document.body.classList.add("no_scroll")
      : document.body.classList.remove("no_scroll");
  };

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <NavLink to="/overview" className="logo">
        F.T
      </NavLink>
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
            <button onClick={handleManangePwd}>Change Password</button>
            <button
              onClick={() => {
                navigate("/");
                dispatch(clearUser());
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
      <ManagePwd visibleBox={managePwd} handleClick={handleManangePwd} />
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
