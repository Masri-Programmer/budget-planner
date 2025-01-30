import axios from "axios";

async function formatExpenses(): Promise<string> {
  const response = await axios.get("http://localhost:3000/categories");
  const data = response.data;

  let output = "";

  data.forEach((category: any, index: number) => {
    output += `${index + 1}. ${category.name} (${category.expected}%)\n`;
    const totalAmount = category.expenses.reduce(
      (sum: number, exp: any) => sum + parseFloat(exp.amount || "0"),
      0
    );
    output += `Gesamtsumme: ${totalAmount.toFixed(2)}€\n`;

    let currentSubcategory = "";
    category.expenses.forEach((expense: any) => {
      if (expense.subcategory && expense.subcategory !== currentSubcategory) {
        output += `\n${expense.subcategory} (${expense.expected || "N/A"}%)\n`;
        currentSubcategory = expense.subcategory;
      }
      output += `${expense.expense}: ${expense.amount}€`;
      if (expense.bank) output += ` — Bank Verbindung: ${expense.bank}`;
      output += "\n";
    });

    output += "\n";
  });

  output += "Bank Verbindung\n";
  if (Array.isArray(data["bank connections"])) {
    data["bank connections"].forEach((bank: string) => {
      output += `${bank}\n`;
    });
  }

  return output;
}

export default formatExpenses;
