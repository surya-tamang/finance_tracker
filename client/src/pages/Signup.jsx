import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");

  // handle new user registration data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // handle form submition

  // console.log(userData.password + " " + userData.confirmPassword);
  const handleSubmit = (e) => {
    const { firstName, lastName, email, password, confirmPassword } = userData;
    const regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields required !");
    } else if (!email.match(regexp)) {
      setError("Invalid email !!");
    } else if (userData.password !== userData.confirmPassword) {
      setError("Password doesn't match with each other!!");
    } else {
      setError("");
    }
  };
  // to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // function to hanlde password visibilty
  const handlePwdVisibilty = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-5 absolute top-0">
      <form
        action="/"
        method="POST"
        autoComplete="true"
        onSubmit={handleSubmit}
        className="bg-light_blue flex flex-col p-8 rounded-xl gap-4 md:w-80 mt-10 w-auto"
      >
        <h1 className="font-medium text-lg uppercase">Register now</h1>
        <span className="text-red text-xs">{error}</span>
        <div className="flex w-full gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            onChange={handleChange}
            value={userData.firstName}
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
          <input
            type="text"
            name="lastName"
            placeholder="last name"
            onChange={handleChange}
            value={userData.lastName}
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={userData.email}
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />
        <div className="relative w-full h-auto">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            placeholder="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full h-auto bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
          <i
            onClick={handlePwdVisibilty}
            className={`fa-regular ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } absolute right-2 top-2 cursor-pointer text-grey`}
          ></i>
        </div>
        <div className="relative w-full h-auto">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="confirmPassword"
            placeholder="confirm password"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="w-full h-auto bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
          <i
            onClick={handlePwdVisibilty}
            className={`fa-regular ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } absolute right-2 top-2 cursor-pointer text-grey`}
          ></i>
        </div>
        <button
          type="submit"
          className="border-2 mt-5 border-yellow py-1 rounded-md text-yellow font-medium hover:bg-yellow hover:text-deep_blue"
        >
          Sign up
        </button>
        <div className="text-xs flex gap-1">
          <h3>Already have an account?</h3>
          <NavLink to="/" className="text-yellow underline">
            Login now
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default Signup;
