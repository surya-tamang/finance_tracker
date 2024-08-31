import { Line } from "react-chartjs-2";
import { LineCharData } from "../../fakeData";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const option = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Expenses",
      },
    },
  };
  return (
    <section className="w-full bg-deep_blue">
      <Line options={option} data={LineCharData} />
    </section>
  );
};

export default LineChart;
