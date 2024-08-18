import { Bar } from "react-chartjs-2";
import { barChartData } from "../../fakeData";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const option = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "expenses",
      },
    },
  };
  return (
    <div className="w-full h-screen bg-deep_blue text-white flex items-center justify-center">
      <section className="w-8/12">
        <Bar options={option} data={barChartData} />
      </section>
    </div>
  );
};

export default BarChart;
