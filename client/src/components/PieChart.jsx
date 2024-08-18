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
    <div className="w-full h-screen bg-deep_blue text-white flex items-center justify-center py-10">
      <section className="w-10/12 h-full">
        <Pie options={option} data={pieChartData} />
      </section>
    </div>
  );
};

export default PieChart;
