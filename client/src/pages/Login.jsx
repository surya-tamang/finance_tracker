import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePwdVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
  };

  const loginUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8520/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        const { accessToken, refreshToken } = data;
        if (accessToken || refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
        const decoded = jwtDecode(accessToken);
        if (decoded.budget) {
          navigate("/overview");
        } else {
          navigate("/setBudget");
        }
      } else {
        setError(data.msg);
      }
    } catch (error) {
      console.log(error);
      setError("Unexpected error occurred | Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      setError("All fields are required");
    } else {
      loginUser(user);
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-5 top-0">
      <form
        action=""
        method="POST"
        autoComplete="on"
        onSubmit={handleSubmit}
        className="bg-light_blue flex flex-col p-8 rounded-xl gap-4 md:w-80 mt-10"
      >
        <h1 className="font-medium text-lg uppercase">Welcome Back</h1>
        <span className="text-red text-xs">{error}</span>

        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          aria-label="Email"
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative w-full h-auto">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            aria-label="Password"
            className="w-full h-auto bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
          <i
            onClick={handlePwdVisibility}
            className={`fa-regular ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } absolute right-2 top-2 cursor-pointer text-grey`}
          ></i>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="border-2 mt-5 border-yellow py-1 rounded-md text-yellow font-medium hover:bg-yellow hover:text-deep_blue"
        >
          {isLoading ? "Logging in..." : "Log in"}
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
