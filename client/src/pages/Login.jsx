import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/users";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    data: users,
    isLoading,
    isError,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // ************************/ form validation \*******************************\\

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handlePwdVisibilty = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      setError("Please fill out all fields.");
      return;
    } else if (user.email !== users.email && user.password !== users.password) {
      setError("User not found");
    } else {
      navigate("/setBudget");
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
          placeholder="email"
          value={user.email}
          onChange={handleChange}
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
