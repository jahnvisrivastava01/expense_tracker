import { useState, useEffect } from "react"

function App() {

  
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [filter, setFilter] = useState("All")

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses")
    return saved ? JSON.parse(saved) : []
  })

  
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  
  const addExpense = () => {
    if (amount === "" || category === "") return

    const newExpense = {
      amount,
      category
    }

    setExpenses([...expenses, newExpense])
    setAmount("")
    setCategory("")
  }

 
  const deleteExpense = (indexToDelete) => {
    const newExpenses = expenses.filter((_, index) => index !== indexToDelete)
    setExpenses(newExpenses)
  }

  
  const total = expenses.reduce((sum, e) => {
    return sum + Number(e.amount)
  }, 0)

  
  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter)

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md">

       
        <h1 className="text-2xl font-bold mb-2">Expense Tracker 💸</h1>
        <h2 className="text-gray-500 mb-4">Total: ₹{total}</h2>

        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-1/2"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        </div>

        
        <button
          onClick={addExpense}
          className="bg-blue-500 text-white w-full py-2 rounded mb-4"
        >
          Add Expense
        </button>

        
        <div className="flex justify-between mb-4">
          <button onClick={() => setFilter("All")} className="px-3 py-1 bg-gray-200 rounded">All</button>
          <button onClick={() => setFilter("Food")} className="px-3 py-1 bg-gray-200 rounded">Food</button>
          <button onClick={() => setFilter("Transport")} className="px-3 py-1 bg-gray-200 rounded">Transport</button>
          <button onClick={() => setFilter("Entertainment")} className="px-3 py-1 bg-gray-200 rounded">Entertainment</button>
        </div>

        
        <ul>
          {filteredExpenses.map((e, index) => (
            <li
              key={index}
              className="flex justify-between items-center border p-2 rounded mb-2"
            >
              <span>
                {e.category} - ₹{e.amount}
              </span>

              <button
                onClick={() => deleteExpense(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default App