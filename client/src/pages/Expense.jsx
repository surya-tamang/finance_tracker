import React, { useState } from "react";
import "../styles/expense.css";
import Header from "../components/Header";

const Expense = () => {
  const [error, setError] = useState("");
  const [expense, setExpense] = useState({
    remark: "",
    amount: "",
    category: "",
  });
  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { remark, amount, category } = expense;

    if (!remark || !amount || !category) {
      setError("All fields required !");
    } else {
      setExpense({ remark: "", amount: "", category: "" });
      setError("");
      setExpenses([...expenses, expense]);
    }
  };

  return (
    <>
      <Header />
      <section className="expense_section">
        <div className="container">
          <h1>Add today's expenses</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="remark"
              value={expense.remark}
              onChange={handleChange}
              placeholder="remarks"
            />
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="amount"
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
              <option value="medicine">Medicine</option>
              <option value="wears">wears</option>
              <option value="grocceries">Grocceries</option>
              <option value="transportation">Transportation</option>
              <option value="extra">Extra</option>
            </select>
            <span id="error">{error}</span>
            <button type="submit">Add</button>
          </form>
          <div className="table_container">
            <table border="1">
              <caption>Statements</caption>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>remarks</th>
                  <th>category</th>
                  <th>amount</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((item, index) => {
                  const { remark, amount, category } = item;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{remark}</td>
                      <td>{category}</td>
                      <td>{`Rs ${amount}`}</td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="3">total</td>
                  <td>
                    {`Rs
                  ${expenses.reduce(
                    (total, item) => (total += Number(item.amount)),
                    0
                  )}`}
                  </td>
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
