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
  plugins,
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
        text: "Steps",
      },
    },
  };
  return (
    <div className="w-full h-screen bg-deep_blue text-white flex items-center justify-center">
      <section className="w-8/12">
        <Line options={option} data={LineCharData} />
      </section>
    </div>
  );
};

export default LineChart;
