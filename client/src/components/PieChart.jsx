import { Pie } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { pieChartData } from "../../fakeData";
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
  return (
    <section className="w-full h-full">
      <Pie options={option} data={pieChartData} />
    </section>
  );
};

export default PieChart;
