import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBlc } from "../redux/slices/blcSlice";
import "../styles/budget.css";

const SetBudget = () => {
  const dispatch = useDispatch();
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBudget(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget) {
      dispatch(addBlc(budget));
      navigate("/overview");
    }
  };
  return (
    <section className="budget">
      <form action="" onSubmit={handleSubmit} className="budgetform">
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
