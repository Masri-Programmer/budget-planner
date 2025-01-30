<template>
  <div
    class="p-6 bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl shadow-lg"
  >
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Categories Overview
    </h1>
    {{ expensesText }}
    <div
      v-for="category in categories"
      :key="category.name"
      class="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        {{ category.name }}
        <span class="text-blue-500 text-lg"
          >({{ category.expected || "N/A" }}% expected)</span
        >
      </h2>
      <table class="w-full border-collapse">
        <thead>
          <tr
            class="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700"
          >
            <th class="border border-gray-300 px-4 py-3 text-left text-sm">
              Subcategory
            </th>
            <th class="border border-gray-300 px-4 py-3 text-left text-sm">
              Expense
            </th>
            <th class="border border-gray-300 px-4 py-3 text-left text-sm">
              Amount (€)
            </th>
            <th class="border border-gray-300 px-4 py-3 text-left text-sm">
              Percent (%)
            </th>
            <th class="border border-gray-300 px-4 py-3 text-left text-sm">
              Bank/Notes
            </th>
            <th class="border border-gray-300 px-4 py-3 text-left text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="expense in category.expenses"
            :key="expense.expense"
            class="hover:bg-blue-50 transition"
          >
            <td class="border border-gray-300 px-4 py-3 text-sm text-gray-600">
              {{ expense.subcategory }}
              <span v-if="expense.expected" class="text-blue-500">
                ({{ expense.expected }}%)
              </span>
            </td>
            <td class="border border-gray-300 px-4 py-3 text-sm text-gray-600">
              {{ expense.expense }}
            </td>
            <td class="border border-gray-300 px-4 py-3 text-sm text-gray-600">
              {{ expense.amount }}€
            </td>
            <td class="border border-gray-300 px-4 py-3 text-sm text-gray-600">
              {{ expense.amount_percent }}%
            </td>
            <td class="border border-gray-300 px-4 py-3 text-sm text-gray-600">
              {{ expense.bank || "-" }}
            </td>
            <td class="border border-gray-300 px-4 py-3 text-sm text-gray-600">
              <!-- <button
                class="px-2 py-1 bg-red-500 text-white rounded"
                @click="deleteCategory(category.name)"
              >
                Delete
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        @click="addCategory"
      >
        Add Category
      </button>
    </div>
    <div class="mt-8 text-center">
      <h2 class="text-2xl font-bold text-gray-800">
        Overall Total:
        <span class="text-blue-500">{{ totalIncome.toFixed(2) }} €</span>
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
// import formatExpenses from "./components/FormatExpenses";

interface Expense {
  subcategory: string;
  expense: string;
  amount: string;
  amount_percent?: string;
  bank?: string;
  expected?: string;
}

interface Category {
  name: string;
  expected: string;
  expenses: Expense[];
}

const categories = ref<Category[]>([]);
const totalIncome = ref<number>(0);

const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    categories.value = response.data;

    totalIncome.value =
      categories.value
        .find((cat) => cat.name === "Einnahmen")
        ?.expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0) || 0;

    categories.value.forEach((category) => {
      category.expenses.forEach((expense) => {
        expense.amount_percent = (
          (parseFloat(expense.amount) / totalIncome.value) *
          100
        ).toFixed(2);
      });
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const expensesText = ref<string>("");

// onMounted(async () => {
//   expensesText.value = await formatExpenses();
// });
const addCategory = async () => {
  const newCategory = {
    name: "New Category",
    expected: "0",
    expenses: [],
  };
  try {
    const response = await axios.post("http://localhost:8000/categories", newCategory);
    categories.value.push(response.data);
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

const deleteCategory = async (name: string) => {
  try {
    await axios.delete(`http://localhost:8000/categories/${name}`);
    categories.value = categories.value.filter((cat) => cat.name !== name);
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

onMounted(fetchCategories);
</script>
