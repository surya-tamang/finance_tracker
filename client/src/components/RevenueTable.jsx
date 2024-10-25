import { useSelector } from "react-redux";

const RevenueTable = () => {
  const userRevenues = useSelector((state) => state.userRevenues.data);
  const totalrevenue = userRevenues.reduce(
    (total, item) => (total += Number(item.amount)),
    0
  );

  const handleDelete = async (id) => {
    const url = `http://localhost:8520/api/user/revenues/${id}`;
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
      <caption>revenue Statements</caption>
      <thead>
        <tr>
          <th>SN</th>
          <th>Source</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {userRevenues.map((item, index) => {
          const { _id, source, amount, date } = item;
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{source}</td>
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
          <td colSpan="3">Total</td>
          <td className="py-3 px-4">{`Rs ${totalrevenue}`}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default RevenueTable;
