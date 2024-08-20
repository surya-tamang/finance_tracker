import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  // for displayin error
  const [error, setError] = useState("");

  // to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // function to hanlde password visibilty
  const handlePwdVisibilty = () => {
    setShowPassword(!showPassword);
  };

  //for storing user
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // function to handle the changes in the input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // function to handle the form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-5 absolute top-0">
      <form
        action=""
        method="POST"
        autoComplete="true"
        onSubmit={handleSubmit}
        className="bg-light_blue flex flex-col p-8 rounded-xl gap-4 md:w-80 mt-10"
      >
        <h1 className="font-medium text-lg uppercase">Welcome Back</h1>
        <span className="text-red text-xs">{error}</span>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />
        <div className="relative w-full h-auto">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            placeholder="password"
            value={user.password}
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
          Log in
        </button>
        <div className="text-xs flex gap-1">
          <h3>New here?</h3>
          <NavLink to="/signup" className="text-yellow underline">
            Sign-up now
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default Login;
