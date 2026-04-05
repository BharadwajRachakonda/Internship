import React from "react";

function Expense(props) {
  const { amount, name } = props;
  return (
    <div className="rounded-2xl border-transparent p-4 w-96 md:mt-3 md:ml-3 border-l-8 border-l-zinc-300/35 backdrop-brightness-150 backdrop-blur-3xl backdrop-contrast-150 backdrop-hue-rotate-15 backdrop-opacity-50">
      <div className="text-3xl font-bold text-zinc-300/35">{name}</div>
      <div
        className={`text-2xl font-light ${name === "Expense" ? "text-red-500/85" : name === "Income" ? "text-green-500/85" : "text-zinc-100/85"}`}
      >
        ${amount.toFixed(2)}
      </div>
    </div>
  );
}

export default Expense;
