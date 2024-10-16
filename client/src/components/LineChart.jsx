import { Line } from "react-chartjs-2";
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
  const LineCharData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [
          5000, 6000, 5040, 5005, 3165, 4695, 3124, 1648, 3146, 3189, 4616,
          7800,
        ],
        borderColor: "#545454",
        backgroundColor: ["#FDF8FA"],
      },
    ],
  };
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
