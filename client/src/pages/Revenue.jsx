import React, { useState, useEffect } from "react";
import "../styles/revenue.css";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const Revenue = () => {
  const userData = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.pending);
  const isError = useSelector((state) => state.user.isError);
  const currentDate = new Date().toLocaleDateString();

  const [revenue, setRevenue] = useState({
    source: "",
    amount: "",
    date: currentDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRevenue({ ...revenue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(revenue);
  };
  return (
    <>
      <Header />
      <section className="revenue_section">
        <h1>Add revenue</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={revenue.source}
            onChange={handleChange}
            name="source"
            placeholder="source"
          />
          <input
            type="number"
            name="amount"
            value={revenue.amount}
            onChange={handleChange}
            placeholder="amount"
          />
          <button>Add</button>
        </form>
      </section>
    </>
  );
};

export default Revenue;
