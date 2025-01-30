export function generateExpenseHtml(data: any) {
  let html = "";

  // Loop through each category
  data.forEach((category: any) => {
    html += `<h1>${category.name} (${category.expected})</h1>`;

    const categoryTotal = category.expenses.reduce(
      (sum: number, expense: any) => sum + expense.amount,
      0
    );

    const categoryPercentage = (
      (categoryTotal /
        data.reduce(
          (total: number, cat: any) =>
            total +
            cat.expenses.reduce(
              (expenseSum: number, expense: any) => expenseSum + expense.amount,
              0
            ),
          0
        )) *
      100
    ).toFixed(1);

    html += `<p>Gesamtsumme: ${categoryTotal.toFixed(
      2
    )}€ (${categoryPercentage}%)</p>`;
    html += "<ul>";

    category.expenses.forEach((expense: any) => {
      const expensePercentage = (
        (expense.amount / categoryTotal) *
        100
      ).toFixed(1);
      html += `<li><strong>${expense.subcategory || expense.expense} (${
        expense.expected || ""
      })</strong>
                  <ul>
                    <li>${expense.expense}: ${
        expense.amount
      }€ (${expensePercentage}%) — Bank Verbindung: ${
        expense.bank?.name || "N/A"
      }</li>
                  </ul>
                </li>`;
    });

    html += "</ul>";
  });

  // Adding income section
  html += `<h1>Einnahmen</h1><ul>`;
  data[data.length - 1].expenses.forEach((income: any) => {
    html += `<li>${income.expense}: ${income.amount}€</li>`;
  });
  html += "</ul>";

  // Total
  const totalIncome = data[data.length - 1].expenses.reduce(
    (sum: number, income: any) => sum + income.amount,
    0
  );

  const totalExpenses = data.reduce(
    (sum: number, category: any) =>
      sum +
      category.expenses.reduce(
        (expenseSum: number, expense: any) => expenseSum + expense.amount,
        0
      ),
    0
  );

  const total = totalIncome + totalExpenses;

  html += `<p>Gesamt ohne Bafög: ${totalIncome}€</p>`;
  html += `<p>Gesamt mit Bafög: ${total}€</p>`;

  return html;
}
