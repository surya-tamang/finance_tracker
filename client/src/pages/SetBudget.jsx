import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/budget.css";

const SetBudget = () => {
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBudget(Number(e.target.value));
  };

  const handleSubmit = () => {
    navigate("/overview");
  };
  console.log(budget);
  return (
    <section className="budget" onSubmit={handleSubmit}>
      <form action="" className="budgetform">
        <input
          type="amount"
          name="budget"
          value={budget}
          onChange={handleChange}
          placeholder="Set budget"
        />
        <button type="submit">Set</button>
      </form>
    </section>
  );
};

export default SetBudget;
