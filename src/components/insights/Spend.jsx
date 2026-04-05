import React from "react";

function Spend(props) {
  const { T } = props;
  const spendByCategory = (T || []).reduce((acc, item) => {
    const category = item.category ?? "Uncategorized";
    const amount = Number(item.amount) || 0;
    if (amount < 0) acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const totalSpent = Object.values(spendByCategory).reduce(
    (sum, amount) => sum + amount,
    0,
  );

  const [topCategory, topAmount] = Object.entries(spendByCategory).reduce(
    (best, current) => (current[1] < best[1] ? current : best),
    ["", 0],
  );
  const percentage = totalSpent
    ? ((topAmount / totalSpent) * 100).toFixed(0)
    : "0";
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-transparent p-4 md:w-96 w-80 md:mt-3 md:ml-3 border-l-8 bg-zinc-50/10 border-l-zinc-300/35 backdrop-brightness-150 backdrop-blur-3xl backdrop-contrast-150 backdrop-hue-rotate-15 backdrop-opacity-50">
      <h3 className="font-semibold text-xl">Top Spending</h3>
      <p className="font-light">
        <span className="text-zinc-300">You spent the most on</span>{" "}
        <span>{topCategory || "Uncategorized"}</span>{" "}
        <span className="text-zinc-300">this month.</span>
      </p>
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className="rounded-full bg-gray-400 h-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Spend;
