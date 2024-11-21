import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const registerUser = async (user) => {
    try {
      const response = await fetch("http://localhost:8520/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccess("Signed up successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to add user");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = userData;
    const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordReg =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields required!");
    } else if (!regexp.test(email)) {
      setError("Invalid email!");
    } else if (!passwordReg.test(password)) {
      setError(
        "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else if (password !== confirmPassword) {
      setError("Password doesn't match!");
    } else {
      setError("");
      registerUser(userData);
    }
  };

  const handlePwdVisibilty = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-5 top-0">
      <NavLink
        to="/"
        className="uppercase text-2xl font-semibold tracking-wider text-red"
      >
        f i n a n c e _ t r a k c e r
      </NavLink>

      <form
        autoComplete="true"
        onSubmit={handleSubmit}
        className="bg-light_blue flex flex-col p-8 rounded-xl gap-4 md:w-96 mt-10 w-full"
      >
        <h1 className="font-medium text-lg uppercase">Register now</h1>
        <span className="text-red text-xs">{error}</span>
        <span className="text-green text-xs">{success}</span>
        <div className="flex w-full gap-2">
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            value={userData.firstName}
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            value={userData.lastName}
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
        </div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={userData.email}
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />
        <div className="relative w-full h-auto">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            placeholder="Password"
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
            Confirm password
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="confirmPassword"
            placeholder="Confirm password"
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
          <NavLink to="/login" className="text-yellow underline">
            Login now
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default Signup;
