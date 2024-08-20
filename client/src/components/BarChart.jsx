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
    scales: {
      x: {
        ticks: {
          color: "#545454", // X-axis label color
        },
        grid: {
          color: "#545454", // X-axis line color
        },
      },
      y: {
        grid: {
          color: "#545454",
        },
      },
    },
  };
  return (
    <section className="w-full bg-deep_blue">
      <Bar options={option} data={barChartData} />
    </section>
  );
};

export default BarChart;
