<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-slate-800 dark:to-stone-800 p-6 shadow-lg"
  >
    <ToggleTheme />
    <router-link
      to="/"
      class="p-2 bg-indigo-500 dark:bg-indigo-600 w-40 flex justify-center text-white font-bold rounded-lg cursor-pointer"
      @click="logout"
    >
      logout
    </router-link>

    <h1
      class="text-3xl font-bold text-gray-200 dark:text-gray-100 mb-6 text-center"
    >
      Categories Overview
    </h1>

    <div
      v-for="category in categories"
      :key="category.name"
      class="mb-8 p-4 bg-gray-800 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-700"
    >
      <h2 class="text-2xl font-semibold text-gray-300 dark:text-gray-300 mb-4">
        {{ category.name }}
        <span class="text-indigo-400 text-lg"
          >({{ category.expected || "N/A" }}% expected)</span
        >
      </h2>
      <table class="w-full border-collapse">
        <thead>
          <tr
            class="bg-gradient-to-r from-indigo-600 to-purple-600 text-gray-100 dark:text-gray-200 dark:slate-800 dark:to-stone-950"
          >
            <th class="border border-gray-700 px-4 py-3 text-left text-sm">
              Subcategory
            </th>
            <th class="border border-gray-700 px-4 py-3 text-left text-sm">
              Expense
            </th>
            <th class="border border-gray-700 px-4 py-3 text-left text-sm">
              Amount (€)
            </th>
            <th class="border border-gray-700 px-4 py-3 text-left text-sm">
              Percent (%)
            </th>
            <th class="border border-gray-700 px-4 py-3 text-left text-sm">
              Bank/Notes
            </th>
            <th class="border border-gray-700 px-4 py-3 text-left text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="expense in category.expenses"
            :key="expense.expense"
            class="hover:bg-indigo-700 dark:hover:bg-purple-700 transition"
          >
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            >
              {{ expense.subcategory }}
              <span v-if="expense.expected" class="text-indigo-400"
                >({{ expense.expected }}%)</span
              >
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            >
              {{ expense.expense }}
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            >
              {{ expense.amount }}€
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            >
              {{ expense.amount_percent }}%
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            >
              {{ expense.bank?.name || "-" }}
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            ></td>
          </tr>
          <tr>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            ></td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            ></td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            >
              {{
                category.expenses
                  .reduce(
                    (sum, expense) => sum + parseFloat(expense.amount || 0),
                    0
                  )
                  .toFixed(2)
              }}€
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            >
              {{
                category.expenses
                  .reduce(
                    (sum, expense) =>
                      sum + parseFloat(expense.amount_percent || 0),
                    0
                  )
                  .toFixed(2)
              }}%
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            ></td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4">
      <button
        class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
        @click="addCategory"
      >
        Add Category
      </button>
    </div>

    <div class="mt-8 text-center">
      <h2 class="text-2xl font-bold text-gray-200 dark:text-gray-100">
        Overall Total:
        <span class="text-indigo-400">{{ totalIncome.toFixed(2) }} €</span>
      </h2>
    </div>
   <div v-html="expenseHtml" class="expense-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ToggleTheme from "./ToggleTheme.vue";
import { useAuth } from "../auth.ts";
import { generateExpenseHtml } from "./generateExpenseHtml";
import type { Bank, Expense, Category } from "../assets/types.ts";

const { logout } = useAuth();

const categories = ref<Category[]>([]);
const totalIncome = ref<number>(0);
const expenseHtml = ref<string>("");
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/categories");
    categories.value = response.data;
    expenseHtml.value = generateExpenseHtml(response.data);
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

const addCategory = async () => {
  const newCategory = {
    name: "New Category",
    expected: "0",
    expenses: [],
  };
  try {
    const response = await axios.post(
      "http://localhost:8000/api/categories",
      newCategory
    );
    categories.value.push(response.data);
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

const deleteCategory = async (name: string) => {
  try {
    await axios.delete(`http://localhost:8000/api/categories/${name}`);
    categories.value = categories.value.filter((cat) => cat.name !== name);
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
onMounted(() => {
  fetchCategories();
});
</script>
