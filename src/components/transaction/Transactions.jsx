import React, { useState, useEffect } from "react";

function Transactions(props) {
  const {
    transactions,
    setTransactions,
    setExpenses,
    setIncome,
    setBalance,
    role,
    setRole,
  } = props;
  const [filter, setFilter] = useState("ALL");
  const [display, setDisplay] = useState([]);
  const [newTx, setNewTx] = useState({
    date: "",
    category: "",
    amount: 0,
    type: "expense",
  });
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
    if (newTransaction.amount > 0) {
      setIncome((prev) => prev + newTransaction.amount);
    } else {
      setExpenses((prev) => prev + Math.abs(newTransaction.amount));
    }
    setBalance((prev) => prev + newTransaction.amount);
  };
  useEffect(() => {
    setDisplay(
      transactions.filter((tx) => {
        if (filter === "ALL") {
          return true;
        }
        if (filter === "INCOME") {
          return tx.amount > 0;
        }
        if (filter === "EXPENSE") {
          return tx.amount < 0;
        }
        return true;
      }),
    );
  }, [transactions, filter]);
  return (
    <div className="flex justify-center items-center p-5">
      <div className="flex flex-col md:flex-row gap-6 flex-wrap justify-center">
        {role === "Admin" && (
          <div className="rounded-2xl min-w75 md:pl-3 bg-zinc-50/10 backdrop-brightness-150 backdrop-blur-3xl backdrop-contrast-150 backdrop-hue-rotate-15 backdrop-opacity-50 pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const absAmount = Math.abs(Number(newTx.amount) || 0);
                if (!newTx.date || !newTx.category || absAmount === 0) return;

                const tx = {
                  id: Date.now(),
                  date: newTx.date,
                  category: newTx.category.trim(),
                  type: newTx.type,
                  amount: newTx.type === "income" ? absAmount : -absAmount,
                };

                addTransaction(tx);
                setNewTx({
                  date: "",
                  category: "",
                  amount: 0,
                  type: "expense",
                });
              }}
              className="flex flex-col gap-4 p-6 pb-8 pt-0"
            >
              <div className="flex justify-between mt-2">
                <h3 className="font-semibold text-center text-xl">
                  Add Transaction
                </h3>
                <button
                  type="submit"
                  className="cursor-pointer border px-6 py-2 rounded-2xl text-sm hover:bg-zinc-300/15 transition ease-in duration-300"
                >
                  Save
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={newTx.date}
                  onChange={(e) =>
                    setNewTx((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full border rounded-2xl px-3 py-2 text-sm"
                  required
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={newTx.category}
                  onChange={(e) =>
                    setNewTx((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full border rounded-2xl px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                  value={newTx.amount}
                  onChange={(e) =>
                    setNewTx((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  className="w-full border rounded-2xl px-3 py-2 text-sm"
                  required
                />

                <select
                  value={newTx.type}
                  onChange={(e) =>
                    setNewTx((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full border rounded-2xl px-3 py-2 text-sm"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </form>
          </div>
        )}
        <div className="flex flex-col gap-2 md:min-w-2xl">
          <div className="flex gap-3 items-center">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border rounded-2xl px-2 py-1"
            >
              <option value={"ALL"}>All</option>
              <option value={"INCOME"}>Income</option>
              <option value={"EXPENSE"}>Expense</option>
            </select>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="text-sm border rounded-2xl px-2 py-1"
            >
              <option value={"Admin"}>Admin</option>
              <option value={"Viewer"}>Viewer</option>
            </select>
          </div>

          <div className="bg-zinc-50/10 backdrop-brightness-150 backdrop-blur-3xl backdrop-contrast-150 backdrop-hue-rotate-15 backdrop-opacity-50 rounded-2xl overflow-hidden border">
            {display.length === 0 ? (
              <div className="p-8 text-center">No transactions found.</div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-xs font-semibold text-gray-500">
                      DATE
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500">
                      CATEGORY
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 text-right">
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {display.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b last:border-0 hover:bg-gray-50 hover:text-black/60 transition ease-in-out duration-200"
                    >
                      <td className="p-4 text-sm">{tx.date}</td>
                      <td className="p-4 font-medium capitalize">
                        {tx.category}
                      </td>
                      <td
                        className={`p-4 text-right font-bold ${tx.type === "income" ? "text-green-600" : ""}`}
                      >
                        {tx.type === "income" ? "+" : ""}${tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
