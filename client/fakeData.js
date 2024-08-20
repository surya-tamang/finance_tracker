export const LineCharData = {
  labels: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  datasets: [
    {
      label: "Steps",
      data: [5000, 6000, 3000, 4000, 4500, 9000, 1500],
      borderColor: "#FDF8FA",
    },
  ],
};

export const barChartData = {
  labels: [
    "Rent",
    "Grocceries",
    "Utilities",
    "Entertainment",
    "Transportation",
  ],
  datasets: [
    {
      label: "expenses",
      data: [1220, 300, 500, 800, 2000],
      backgroundColor: ["#FDF8FA"],
      borderColor: ["#FDF8FA"],
      borderwidth: 1,
    },
  ],
};

export const pieChartData = {
  labels: ["Remainings", "Expenses"],
  datasets: [
    {
      label: "Budget",
      data: [50000, 35000],
      backgroundColor: ["#F8AE56", "#F34B49"],
      hoverOffset: 4,
    },
  ],
};
