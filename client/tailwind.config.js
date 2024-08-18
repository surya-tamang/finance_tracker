/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        deep_blue: "#001016",
        white: "#FDF8FA",
        red: "#F34B49",
        yellow: "#F8AE56",
        green: "#56F85C",
        grey: "#545454",
        light_blue: "#545454",
      },
    },
  },
  plugins: [],
};
