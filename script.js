document.getElementById("save-button").addEventListener("click", saveJournalEntry);

let journalData = [];

function saveJournalEntry() {
  const pair = document.getElementById("pair").value;
  const trade1 = parseFloat(document.getElementById("trade-1").value) || 0;
  const trade2 = parseFloat(document.getElementById("trade-2").value) || 0;
  const trade3 = parseFloat(document.getElementById("trade-3").value) || 0;
  const trade4 = parseFloat(document.getElementById("trade-4").value) || 0;
  const totalPL = trade1 + trade2 + trade3 + trade4;

  const newEntry = {
    date: new Date().toLocaleDateString(),
    pair,
    trades: [trade1, trade2, trade3, trade4],
    totalPL,
  };

  journalData.push(newEntry);
  updateHistoryTable();
  renderChart();
}

function updateHistoryTable() {
  const tableBody = document.getElementById("history-table").querySelector("tbody");
  tableBody.innerHTML = "";

  journalData.forEach((entry) => {
    const row = `
      <tr>
        <td>${entry.date}</td>
        <td>${entry.pair}</td>
        <td>${entry.trades.join(", ")}</td>
        <td>${entry.totalPL}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function renderChart() {
  const ctx = document.getElementById("performance-chart").getContext("2d");
  const labels = journalData.map((entry) => entry.date);
  const data = journalData.map((entry) => entry.totalPL);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total P/L",
          data,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
  });
}
