import { useState, useRef } from "react";
import "./App.css";
import Expense from "./components/Expense";
import Saved from "./components/insights/Saved";
import Spend from "./components/insights/Spend";
import Expenditure from "./components/insights/Expenditure";
import Empty from "./components/insights/Empty";
import Transactions from "./components/transaction/Transactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [role, setRole] = useState("Admin");

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 390;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bgr"></div>
      <div className="z-0 relative">
        <div>
          <h1 className="text-5xl font-bold text-zinc-300/35 text-center my-10">
            Expense Tracker
          </h1>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-around md:gap-0 gap-3">
          <Expense amount={balance} name={"Total Balance"} />
          <Expense amount={income} name={"Income"} />
          <Expense amount={expenses} name={"Expense"} />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-zinc-300/35 text-center my-10">
            Data Insights
          </h2>

          <div className="flex justify-center items-center px-4">
            <div className="relative group md:max-w-5xl w-full">
              <button
                onClick={() => scroll("left")}
                className="absolute left-5 md:-left-10 top-1/2 -translate-y-1/2 z-20 bg-zinc-300/15 p-3 rounded-full hover:bg-zinc-400/15 transition ease-in duration-300"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              >
                <div
                  ref={scrollRef}
                  className="flex flex-row overflow-x-auto gap-8 p-10 no-scrollbar"
                >
                  <div className="md:block min-w-60 hidden">
                    <Empty />
                  </div>
                  <div className="min-w-75 shrink-0">
                    <Saved
                      percentage={Math.round((balance / income) * 100 || 0)}
                    />
                  </div>
                  <div className="min-w-75 shrink-0">
                    <Spend T={transactions} />
                  </div>
                  <div className="min-w-75 shrink-0">
                    <Expenditure expenses={expenses} income={income} />
                  </div>
                  <div className="md:block min-w-60 hidden">
                    <Empty />
                  </div>
                </div>
              </div>

              <button
                onClick={() => scroll("right")}
                className="absolute right-5 md:-right-10 top-1/2 -translate-y-1/2 z-20 bg-zinc-300/15 p-3 rounded-full hover:bg-zinc-400/15 transition ease-in duration-300"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-zinc-300/35 text-center my-10">
            Transactions
          </h2>
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
            setExpenses={setExpenses}
            setIncome={setIncome}
            setBalance={setBalance}
            role={role}
            setRole={setRole}
          />
        </div>
      </div>
    </>
  );
}

export default App;
