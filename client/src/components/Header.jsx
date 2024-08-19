import React from "react";

const Header = () => {
  const navList = [
    { name: "overview", path: "/overview" },
    { name: "expense", path: "/expense" },
    { name: "revenue", path: "/revenue" },
  ];
  return (
    <header className="flex items-center justify-between px-10 py-5">
      <h1 className="text-red text-4xl font-medium">F.T</h1>
      <section>
        <nav>
          <ul className="flex gap-4">
            {navList.map((item, index) => {
              const { name } = item;
              return (
                <li key={index} className="px-2 capitalize">
                  {name}
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
