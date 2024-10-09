import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/budget.css";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const SetBudget = () => {
  const [user, setUser] = useState({});
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwtDecode(accessToken);
    setUser(decoded);
  }, []);

  const url = `http://localhost:8520/api/setBudget/${user.id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!budget) {
      console.log("Set the budget you have");
    }
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
