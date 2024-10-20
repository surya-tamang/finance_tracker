const Features = () => {
  const content = [
    {
      icon: "fa-solid fa-wallet",
      iconColor: "text-red",
      title: "add expense",
      des: "Easily track where your money is going by adding expenses with just a few clicks.",
    },
    {
      icon: "fa-solid fa-money-bill-wave",
      iconColor: "text-green",
      title: "add revenue",
      des: "Log your income and see a clear breakdown of your financial health.",
    },
    {
      icon: "fa-solid fa-bullseye",
      iconColor: "text-white",
      title: "set budget",
      des: "Plan your finances ahead by setting monthly or weekly budgets and stay on track.",
    },
    {
      icon: "fa-solid fa-chart-column",
      iconColor: "text-white",
      title: "view charts",
      des: "Visualize your expenses and revenue with interactive charts for better decision-making.",
    },
  ];
  return (
    <section className="text-white">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8">
        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {content.map((item, index) => {
            const { icon, iconColor, title, des } = item;
            return (
              <div
                key={index}
                className="flex items-start gap-4 bg-light_blue p-8 rounded-lg"
              >
                <span
                  className={`shrink-0 rounded-lg bg-gray-800 p-4 ${iconColor}`}
                >
                  <i className={icon}></i>
                </span>

                <div>
                  <h2 className="text-lg font-bold capitalize">{title}</h2>
                  <p className="mt-1 text-sm text-gray-300">{des}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
