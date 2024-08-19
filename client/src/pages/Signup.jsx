import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-5 absolute top-0">
      {/* <h1 className="text-3xl text-red font-medium tracking-widest uppercase">
        Finance Tracker
      </h1> */}
      <form
        action=""
        method="POST"
        autoComplete="true"
        className="bg-light_blue flex flex-col p-8 rounded-xl gap-4 md:w-80 mt-10 w-auto"
      >
        <h1 className="font-medium text-lg uppercase">Register now</h1>
        <span className="text-red text-xs">{error}</span>
        <div className="flex w-full gap-2">
          <input
            type="text"
            name="fname"
            placeholder="first name"
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
          <input
            type="text"
            name="lname"
            placeholder="last name"
            className="w-full bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
          />
        </div>
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
        <input
          type="password"
          name="re-password"
          placeholder="confirm password"
          className="bg-transparent border-b-2 p-1 border-grey outline-0 focus:border-white"
        />
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
