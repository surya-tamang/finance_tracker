import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/budget.css";
import { jwtDecode } from "jwt-decode";

const SetBudget = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();
  const decoded = jwtDecode(accessToken);

  const url = `http://localhost:8520/api/setBudget/${decoded.id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!budget) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ budget }),
        });
        if (response.ok) {
          navigate("/overview");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <section className="budget">
      <form action="" onSubmit={handleSubmit} className="budgetform">
        <input
          type="text"
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Set budget"
        />
        <button type="submit">Set</button>
      </form>
    </section>
  );
};

export default SetBudget;
