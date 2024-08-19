import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const handleSubmit = (e) => {
    e.prevent.Default();
  };
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-5 absolute top-0">
      {/* <h1 className="text-3xl text-red font-medium tracking-widest uppercase">
        Finance Tracker
      </h1> */}
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
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />
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
