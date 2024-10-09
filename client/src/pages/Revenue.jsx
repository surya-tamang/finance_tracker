import React, { useState, useEffect } from "react";
import "../styles/revenue.css";
import Header from "../components/Header";
import { fetchUser } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const Revenue = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwtDecode(accessToken);
    const userId = decoded.id;

    if (userId) {
      const url = `http://localhost:8520/api/user/${userId}`;
      dispatch(fetchUser(url));
    }
  }, [dispatch]);
  const userData = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.pending);
  const isError = useSelector((state) => state.user.isError);
  const [revenue, setRevenue] = useState({
    remark: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRevenue({ ...revenue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(revenue);
  };
  return (
    <>
      <Header />
      <section className="revenue_section">
        <h1>Add revenue</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={revenue.remark}
            onChange={handleChange}
            name="remark"
            placeholder="remarks"
          />
          <input
            type="number"
            name="amount"
            value={revenue.amount}
            onChange={handleChange}
            placeholder="amount"
          />
          <button>Add</button>
        </form>
      </section>
    </>
  );
};

export default Revenue;
