let transactions = [];
let startingBalance = 5000;

const categoryMap = {
  grocery: "Food",
  uber: "Transport",
  rent: "Housing",
  netflix: "Entertainment",
  salary: "Income"
};


async function loadTransactions() {
  
  const response = await Promise.resolve([
    { date: "2025-01-05", description: "Uber Ride", amount: -25 },
    { date: "2025-01-10", description: "Grocery Store", amount: -220 },
    { date: "2025-01-15", description: "Netflix", amount: -15 },
    { date: "2025-01-20", description: "Rent", amount: -1200 },
    { date: "2025-01-25", description: "Salary", amount: 3000 }
  ]);
  
  transactions = response.map(tx => ({
    ...tx,
    category: mapCategory(tx.description)
  }));

  render();
}

function mapCategory(description) {
  const key = description.toLowerCase();
  for (let k in categoryMap) {
    if (key.includes(k)) return categoryMap[k];
  }
  return "Other";
}

function render() {
  const tbody = document.getElementById("transactions");
  const highSpendValue = Number(document.getElementById("highSpend").value);
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  tbody.innerHTML = "";
  let balance = startingBalance;

  const filtered = transactions.filter(tx => {
    if (startDate && tx.date < startDate) return false;
    if (endDate && tx.date > endDate) return false;
    return true;
  });

  filtered.forEach(tx => {
    balance += tx.amount;

    const tr = document.createElement("tr");
    if (Math.abs(tx.amount) >= highSpendValue && tx.amount < 0) {
      tr.classList.add("high-spend");
    }

    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.description}</td>
      <td>${tx.category}</td>
      <td>${tx.amount}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("balance").textContent = `$${balance}`;
}

document.getElementById("highSpend").addEventListener("input", render);
document.getElementById("startDate").addEventListener("change", render);
document.getElementById("endDate").addEventListener("change", render);


document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.json";
  a.click();
  URL.revokeObjectURL(url);
});
loadTransactions();
