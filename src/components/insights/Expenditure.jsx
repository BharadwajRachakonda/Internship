import React from "react";

function Expenditure(props) {
  const { expenses, income } = props;
  return (
    <div className="rounded-2xl border-transparent p-4 md:w-96 w-80 md:mt-3 md:ml-3 border-l-8 bg-zinc-50/10 border-l-zinc-300/35 backdrop-brightness-150 backdrop-blur-3xl backdrop-contrast-150 backdrop-hue-rotate-15 backdrop-opacity-50">
      <h3 className="font-semibold text-xl">Spending Pattern</h3>
      <p className="font-light">
        <span className="text-zinc-300">Your expenses account for</span>{" "}
        <span>{Math.round((expenses / income) * 100) || 0}%</span>{" "}
        <span className="text-zinc-300">of your total income.</span>
      </p>
    </div>
  );
}

export default Expenditure;
