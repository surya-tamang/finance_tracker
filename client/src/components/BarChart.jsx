import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const userExpenses = useSelector((state) => state.userExpenses.data);

  const foodExp = userExpenses.filter((expense) => expense.category === "food");
  const stationaryExp = userExpenses.filter(
    (expense) => expense.category === "stationary"
  );
  const healthExp = userExpenses.filter(
    (expense) => expense.category === "medicine"
  );
  const wearsExp = userExpenses.filter(
    (expense) => expense.category === "wears"
  );
  const grocceriesExp = userExpenses.filter(
    (expense) => expense.category === "grocceries"
  );
  const transportaionExp = userExpenses.filter(
    (expense) => expense.category === "transportation"
  );
  const travellingExp = userExpenses.filter(
    (expense) => expense.category === "travelling"
  );
  const extraExp = userExpenses.filter(
    (expense) => expense.category === "extra"
  );

  const barChartData = {
    labels: [
      "food",
      "stationary",
      "health",
      "wears",
      "grocceries",
      "transportaion",
      "travelling",
      "extra",
    ],
    datasets: [
      {
        label: "expenses",
        data: [
          foodExp.reduce((total, item) => (total += Number(item.amount)), 0),
          stationaryExp.reduce(
            (total, item) => (total += Number(item.amount)),
            0
          ),
          healthExp.reduce((total, item) => (total += Number(item.amount)), 0),
          wearsExp.reduce((total, item) => (total += Number(item.amount)), 0),
          grocceriesExp.reduce(
            (total, item) => (total += Number(item.amount)),
            0
          ),
          transportaionExp.reduce(
            (total, item) => (total += Number(item.amount)),
            0
          ),
          travellingExp.reduce(
            (total, item) => (total += Number(item.amount)),
            0
          ),
          extraExp.reduce((total, item) => (total += Number(item.amount)), 0),
        ],
        backgroundColor: ["#FDF8FA"],
        borderColor: ["#FDF8FA"],
        borderwidth: 1,
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
