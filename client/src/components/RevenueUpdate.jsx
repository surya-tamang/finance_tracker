import { useState } from "react";

const RevenueUpdate = ({ visible, id, disable }) => {
  const [data, setData] = useState({
    source: "",
    amount: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    const url = `http://localhost:8520/api/user/revenues/${id}`;

    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datas = await response.json();
      if (!response.ok) {
        setError(datas.msg);
        return;
      }
      setSuccessMsg(datas.msg);
      setTimeout(() => {
        disable;
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        visible ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50  justify-center items-center z-40`}
    >
      <form
        action=""
        className="bg-light_blue relative"
        onSubmit={handleSubmit}
      >
        <button
          onClick={disable}
          className="absolute left-4 border-none bottom-6 w-10 h-8 p-0"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <input
          type="number"
          value={data.amount}
          onChange={handleChange}
          placeholder="amount"
          name="amount"
        />
        <input
          type="text"
          value={data.source}
          onChange={handleChange}
          placeholder="source"
          name="source"
        />
        <span className="text-red">{error}</span>
        <span className="text-green">{successMsg}</span>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default RevenueUpdate;
