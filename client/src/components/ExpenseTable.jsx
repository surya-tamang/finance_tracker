import { useState } from "react";
import { useSelector } from "react-redux";

const ExpenseTable = () => {
  const userExpenses = useSelector((state) => state.userExpenses.data);
  const totalExpense = userExpenses.reduce(
    (total, item) => (total += Number(item.amount)),
    0
  );

  const [disabled, setDisabled] = useState(true);
  return (
    <table border="1">
      <caption>Expense Statements</caption>
      <thead>
        <tr>
          <th>SN</th>
          <th>purpose</th>
          <th>category</th>
          <th>date</th>
          <th>amount</th>
          <th>update</th>
        </tr>
      </thead>

      <tbody>
        {userExpenses.map((item, index) => {
          const { _id, purpose, amount, category, date } = item;
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={purpose}
                  className="bg-transparent"
                  disabled={disabled}
                />
              </td>
              <td>{category}</td>
              <td>{date.split("T")[0]}</td>
              <td>{`Rs ${amount}`}</td>
              <td className="flex gap-4 justify-center">
                <button className="hover:bg-transparent hover:text-yellow">
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button className="hover:bg-transparent hover:text-yellow">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="hover:bg-transparent hover:text-yellow">
                  save
                </button>
              </td>
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
  );
};

export default ExpenseTable;
