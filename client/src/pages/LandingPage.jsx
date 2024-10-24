import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/landingpage.css";
import Heading from "../components/Heading";
import Features from "../components/Features";
import Steps from "../components/Steps";
import FAQs from "../components/FAQs";
import { Link } from "react-scroll";
import Nav from "../components/Nav";

const LandingPage = () => {
  return (
    <main className="w-full min-h-screen">
      <Link
        to="hero"
        offset={-10}
        duration={500}
        spy={true}
        smooth={true}
        className="fixed bg-yellow text-deep_blue cursor-pointer h-16 w-16 rounded-full bottom-10 right-10 text-xl flex justify-center items-center"
      >
        <i class="fa-solid fa-arrow-up"></i>
      </Link>
      <section id="hero" className="h-screen flex items-center mb-16">
        <header className="w-full absolute top-0 px-10 flex items-center justify-between">
          <h1 className="text-red text-3xl font-bold py-4">F.T</h1>
          <Nav />
          <div className="flex gap-4 items-center">
            <NavLink to="/login" className="hover:text-yellow font-semibold">
              Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className="hover:text-white text-yellow border-2 border-yellow hover:bg-yellow py-2 px-4 rounded-xl font-semibold"
            >
              Sign up
            </NavLink>
          </div>
        </header>
        <article className="md:ml-16 ml-8">
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

      <section
        id="features"
        className="flex items-center justify-center flex-col my-10"
      >
        <Heading text="powerful features to track your finances" />
        <Features />
      </section>

      <section
        id="steps"
        className="flex items-center justify-center flex-col my-10"
      >
        <Heading text="manage your finances in 5 easy steps" />
        <Steps />
      </section>

      <section
        id="about"
        className="flex items-center justify-center flex-col my-20"
      >
        <Heading text="About us" />
        <article className="w-10/12">
          <p className="text-center mt-16">
            We are a team of passionate developers and finance enthusiasts who
            believe in empowering individuals to take control of their finances.
            Our mission is to provide an intuitive, user-friendly finance
            tracker to help users manage their expenses, track revenue, and
            reach their financial goals. With a focus on simplicity and
            transparency, we aim to make financial management accessible to
            everyone.
          </p>
        </article>
      </section>

      <section
        id="faq"
        className="flex items-center justify-center flex-col my-32"
      >
        <Heading text="Frequently Asked Questions" />
        <FAQs />
      </section>
    </main>
  );
};

export default LandingPage;
