const Steps = () => {
  const content = [
    {
      step: "set budget",
      des: "Create budgets to control your spending and reach your financial goals.",
    },
    {
      step: "add expenses",
      des: "Quickly add your daily expenses to keep track of your spending.",
    },
    {
      step: " Add Revenues",
      des: "Log your income to understand your financial situation better.",
    },
    {
      step: "Visualize your Finances",
      des: "Use interactive charts to see your spending and revenue trends at a glance.",
    },
    {
      step: "Get Expenses Statements",
      des: "Receive detailed reports of your expenses for a comprehensive overview.",
    },
  ];
  return (
    <section className="w-11/12 p-6 mt-14">
      {content.map((item, index) => {
        const { step, des } = item;
        return (
          <div key={index} className="md:h-28 relative">
            <span className="h-28 w-2 left-3 bg-yellow absolute bottom-0"></span>
            <span className="h-8 w-8 rounded-full bg-yellow absolute top-0"></span>
            <article className="ml-20 pt-4">
              <h1 className="font-semibold text-xl capitalize">
                Step {index + 1}: {step}
              </h1>
              <p className="italic mt-2">{des}</p>
            </article>
          </div>
        );
      })}
    </section>
  );
};

export default Steps;
