import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
Chartjs.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const option = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Budget",
      },
    },
  };
  const userData = useSelector((state) => state.user.userInfo);
  const userExpenses = useSelector((state) => state.userExpenses.data);
  const totalExpense = userExpenses.reduce(
    (total, item) => (total += Number(item.amount)),
    0
  );
  const pieChartData = {
    labels: ["Remainings", "Expenses"],
    datasets: [
      {
        label: "Budget",
        data: [`${userData.currentBudget}`, `${totalExpense}`],
        backgroundColor: ["#F8AE56", "#F34B49"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <section className="w-full h-full">
      <Pie options={option} data={pieChartData} />
    </section>
  );
};

export default PieChart;
