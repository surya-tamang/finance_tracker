import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/landingpage.css";
import Heading from "../components/Heading";
import Features from "../components/Features";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen">
      <section id="hero" className="h-screen flex items-center mb-16">
        <header className="w-full absolute top-0 px-10 flex items-center justify-between">
          <h1 className="text-red text-3xl font-bold">F.T</h1>
          <nav>
            <ul className="flex gap-8 py-6">
              <Link className="hover:text-yellow">Tutorial</Link>
              <Link className="hover:text-yellow">About us</Link>
              <Link className="hover:text-yellow">FAQs</Link>
            </ul>
          </nav>
          <NavLink to="/login" className="hover:text-yellow font-semibold">
            Login
          </NavLink>
        </header>
        <article className="ml-16">
          <h1 className="md:text-5xl text-3xl font-semibold my-8">
            Track your finances with ease
          </h1>
          <p className="md:text-xl text-base tracking-wide my-8">
            Monitor expenses, plan budget, and keep your financial goals in
            sight
          </p>
          <NavLink
            to="/login"
            className="hover:bg-yellow border-yellow border-2 text-yellow py-4 px-8 hover:text-deep_blue font-bold"
          >
            Get started
          </NavLink>
        </article>
      </section>
      <section className="flex items-center justify-center flex-col my-4">
        <Heading text="powerful features to track your finances" />
        <Features />
      </section>
    </div>
  );
};

export default LandingPage;
