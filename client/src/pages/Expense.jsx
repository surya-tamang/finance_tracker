import React from "react";
import "../styles/expense.css";

const Expense = () => {
  return (
    <section className="expense_section">
      <div className="container">
        <h1>Add today's expenses</h1>
        <form action="">
          <input type="text" placeholder="remarks" />
          <input type="number" placeholder="amount" />
          <select name="category" id="category">
            <option value="category" selected disabled>
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
          <button>Add</button>
        </form>
        <div className="table_container">
          <table border="1">
            <caption>Statements</caption>
            <thead>
              <tr>
                <th>remarks</th>
                <th>category</th>
                <th>amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="2">total</td>
                <td>-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Expense;
