import React, { useState, useEffect } from "react";
import "../styles/expense.css";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const Expense = () => {
  const userData = useSelector((state) => state.user.userInfo);
  console.log(userData);
  const userExpenses = useSelector((state) => state.userExpenses.data);
  console.log(userExpenses);
  const isLoading = useSelector((state) => state.user.pending);
  const isError = useSelector((state) => state.user.isError);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const currentDate = new Date().toLocaleDateString();
  const url = `http://localhost:8520/api/user/expenses/${userData._id}`;
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    purpose: "",
    date: currentDate,
  });
  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
    setError("");
    setSuccessMsg("");
  };

  const totalExpense = userExpenses.reduce(
    (total, item) => (total += Number(item.amount)),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { purpose, amount, category } = expense;

    if (!purpose || !amount || !category) {
      setError("All fields required !");
    } else if (expense.amount >= userData.currentBudget) {
      setError("Not enough balance!!");
    } else {
      setExpense({ amount: "", purpose: "", category: "" });
      setError("");
      setExpenses([...expenses, expense]);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(expense),
        });
        const data = await response.json();
        setSuccessMsg(data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />
      <section className="expense_section">
        <div className="container">
          <h1>Add today's expenses</h1>
          <form action="POST" onSubmit={handleSubmit}>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="amount"
            />
            <input
              type="text"
              name="purpose"
              value={expense.purpose}
              onChange={handleChange}
              placeholder="purpose"
            />
            <select
              name="category"
              onChange={handleChange}
              value={expense.category}
              id="category"
            >
              <option value="" disabled>
                Category
              </option>
              <option value="food">Food</option>
              <option value="stationary">Stationary</option>
              <option value="medicine">Health</option>
              <option value="wears">Clothes and Shoes</option>
              <option value="grocceries">Grocceries</option>
              <option value="transportation">Transportation</option>
              <option value="travelling">Travelling</option>
              <option value="extra">Extra</option>
            </select>
            <span id="error">{error}</span>
            <span className="text-green">{successMsg}</span>
            <button type="submit">Add</button>
          </form>
          <div className="table_container">
            <table border="1">
              <caption>Expense Statements</caption>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>purpose</th>
                  <th>category</th>
                  <th>date</th>
                  <th>amount</th>
                </tr>
              </thead>

              <tbody>
                {userExpenses.map((item, index) => {
                  const { purpose, amount, category, date } = item;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{purpose}</td>
                      <td>{category}</td>
                      <td>{date.split("T")[0]}</td>
                      <td>{`Rs ${amount}`}</td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="4">total</td>
                  <td>{`Rs ${totalExpense}`}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Expense;
