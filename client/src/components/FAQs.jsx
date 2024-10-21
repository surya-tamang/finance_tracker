const FAQs = () => {
  const content = [
    {
      question:
        "Can I link my bank account to track transactions automatically?",
      answer:
        "Currently, the app does not support automatic bank linking. However, you can manually input your expenses and revenue for precise tracking.",
    },
    {
      question: "How do I add an expense?",
      answer:
        "Simply go to the 'Add Expense' section, fill in the necessary details such as category, amount, and date, and click 'Save'. The expense will automatically be added to your records.",
    },
    {
      question: "What types of charts can I view?",
      answer:
        "You can visualize your data through interactive charts, including line, bar, and pie charts, helping you track your expenses and revenue over time.",
    },
    {
      question: "What platforms is the finance tracker available on?",
      answer:
        "Our finance tracker is currently available on the web, and we are working on releasing mobile versions for iOS and Android soon.",
    },
  ];
  return (
    <div className="space-y-4 w-10/12 mt-16">
      {content.map((item, index) => {
        const { question, answer } = item;
        return (
          <details
            key={index}
            className="group [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-light_blue p-4 text-white w-full">
              <h2 className="font-medium">{question}</h2>

              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <p className="mt-4 px-4 leading-relaxed text-gray-700">{answer}</p>
          </details>
        );
      })}
    </div>
  );
};

export default FAQs;
