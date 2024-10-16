import React, { useState, useEffect } from "react";
import "../styles/revenue.css";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const Revenue = () => {
  const userData = useSelector((state) => state.user.userInfo);
  const url = `http://localhost:8520/api/user/revenues/${userData._id}`;
  const currentDate = new Date().toLocaleDateString();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [revenue, setRevenue] = useState({
    source: "",
    amount: "",
    date: currentDate,
  });

  const handleChange = (e) => {
    setError("");
    setSuccessMsg("");
    const { name, value } = e.target;
    setRevenue({ ...revenue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { source, amount } = revenue;
    if (!source || !amount) {
      setError("all fields required");
    } else {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(revenue),
        });
        const data = await response.json();
        setSuccessMsg(data.msg);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <Header />
      <section className="revenue_section">
        <h1>Add revenue</h1>
        <form action="" onSubmit={handleSubmit}>
          <span className="text-red">{error}</span>
          <span className="text-green">{successMsg}</span>
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
