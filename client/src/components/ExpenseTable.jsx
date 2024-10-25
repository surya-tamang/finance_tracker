import { useSelector } from "react-redux";

const ExpenseTable = () => {
  const userExpenses = useSelector((state) => state.userExpenses.data);
  const totalExpense = userExpenses.reduce(
    (total, item) => (total += Number(item.amount)),
    0
  );

  const handleDelete = async (id) => {
    const url = `http://localhost:8520/api/user/expenses/${id}`;
    const confirmation = confirm("You really want to delete?");
    if (confirmation) {
      try {
        await fetch(url, { method: "DELETE" });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <table border="1">
      <caption>Expense Statements</caption>
      <thead>
        <tr>
          <th>SN</th>
          <th>Purpose</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {userExpenses.map((item, index) => {
          const { _id, purpose, amount, category, date } = item;
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{purpose}</td>
              <td>{category}</td>
              <td>{date.split("T")[0]}</td>
              <td>{`Rs ${amount}`}</td>
              <td className="flex gap-4 justify-center">
                <button
                  onClick={() => handleDelete(_id)}
                  className="hover:bg-transparent hover:text-yellow"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        <tr className="border-t bg-gray-100">
          <td colSpan="4">Total</td>
          <td className="py-3 px-4">{`Rs ${totalExpense}`}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseTable;
