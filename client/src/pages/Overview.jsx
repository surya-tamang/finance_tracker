import React from "react";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const Overview = () => {
  const userData = useSelector((state) => state.user.userInfo);
  const userExpenses = useSelector((state) => state.userExpenses.data);
  const userRevenues = useSelector((state) => state.userRevenues.data);
  const totalExpense = userExpenses.reduce(
    (total, item) => (total += Number(item.amount)),
    0
  );
  const totalRevenue = userRevenues.reduce(
    (total, item) => (total += Number(item.amount)),
    0
  );
  const isLoading = useSelector((state) => state.user.pending);
  const isError = useSelector((state) => state.user.isError);
  const status = [
    { name: "expense", amount: `- ${totalExpense}`, color: "#F34B49" },
    { name: "balance", amount: userData.currentBudget || 0, color: "#FDF8FA" },
    { name: "revenue", amount: `+ ${totalRevenue}`, color: "#56F85C" },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>Error occured...</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="w-full min-h-screen flex justify-center px-10 flex-col gap-10 pt-20 md:pb-16 p-2">
        <h1 className="text-2xl font-medium tracking-widest capitalize mt-16">
          Welcome, {userData.firstName} {userData.lastName}
        </h1>
        <section className="flex w-full h-full md:flex-row flex-col gap-2 md:mt-6">
          <div className="md:w-7/12 md:h-auto h-screen w-full flex flex-col p-4 md:gap-16">
            <div className="flex md:gap-20 gap-10 md:justify-start justify-center h-2/6">
              {status.map((item, index) => {
                const { name, amount, color } = item;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-light_blue md:h-30 md:w-40 h-20 w-40 justify-center md:px-10  rounded-lg"
                  >
                    <h1 className="md:text-lg text-base font-normal capitalize">
                      {name}
                    </h1>
                    <span
                      className={`text-sm text-${color}`}
                      style={{ color: color }}
                    >
                      {amount}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex items-center justify-center bg-white">
              <BarChart />
            </div>
          </div>
          <div className="md:w-4/12 w-full h-full bg-light_blue p-4 rounded-lg">
            <PieChart />
            <div className="mt-10 capitalize">
              <h1>remaining : Rs {userData.currentBudget}</h1>
              <h1>expenses : Rs {totalExpense}</h1>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Overview;
