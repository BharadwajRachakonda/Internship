import React from "react";

function Saved(props) {
  const { percentage } = props;
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-transparent p-4 md:w-96 w-80 md:mt-3 md:ml-3 border-l-8 bg-zinc-50/10 border-l-zinc-300/35 backdrop-brightness-150 backdrop-blur-3xl backdrop-contrast-150 backdrop-hue-rotate-15 backdrop-opacity-50">
      <h3 className="font-semibold text-xl">Visual Progress</h3>
      <div className="font-light">
        <span className="text-zinc-300">Savings Goal</span>{" "}
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className={`rounded-full bg-green-400 h-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Saved;
