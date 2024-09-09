import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import addUser from "../redux/slices/addUser";

const Signup = () => {
  const [error, setError] = useState("");

  // ************************/ handle user data \*******************************\\

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // ************************/ fucntion to store inputs in userData \*******************************\\

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setError("");
  };

  // ************************/ handle form submition \*******************************\\
  const dispatch = useDispatch();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = userData;
    const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields required !");
    } else if (!regexp.test(email)) {
      setError("Invalid email !!");
    } else if (userData.password !== confirmPassword) {
      setError("Password doesn't match !!");
    } else {
      setError("");
      dispatch(addUser(userData));
    }
  };

  // ************************/ function to handle password visibility \*******************************\\

  const handlePwdVisibilty = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-5 top-0">
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
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            onChange={handleChange}
            value={userData.firstName}
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
          <label htmlFor="lastName" className="sr-only">
            last name
          </label>

          <input
            type="text"
            name="lastName"
            placeholder="last name"
            onChange={handleChange}
            value={userData.lastName}
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
        </div>
        <label htmlFor="email" className="sr-only">
          email
        </label>

        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={userData.email}
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />
        <div className="relative w-full h-auto">
          <label htmlFor="password" className="sr-only">
            password
          </label>
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
          <label htmlFor="confirmPassword" className="sr-only">
            confirm password
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
