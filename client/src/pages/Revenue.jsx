import React, { useState } from "react";
import "../styles/revenue.css";

const Revenue = () => {
  const [revenue, setRevenue] = useState({
    remark: "",
    amount: "",
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
    <section className="revenue_section">
      <h1>Add revenue</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={revenue.remark}
          onChange={handleChange}
          name="remark"
          placeholder="remarks"
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
  );
};

export default Revenue;
