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
      v-for="(category, index) in categories"
      :key="`${category.id}-${index}`"
      class="mb-8 p-4 bg-gray-800 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-700"
    >
      <h2
        class="text-2xl font-semibold text-gray-300 dark:text-gray-300 mb-4 flex items-center"
      >
        <input
          type="text"
          name=""
          v-model="category.name"
          id=""
          class="grow outline-none"
          @blur="updateCategory(category)"
        />
        <div class="text-indigo-400 text-lg flex items-center gap-3">
          (
          <input
            type="number"
            v-model="category.expected"
            class="outline-none w-8"
            @blur="updateCategory(category)"
          />% )
  <button type="button" class="cursor-pointer" @click="deleteCategory(category)">
      <span><svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" class="text-indigo-400" fill="oklch(0.673 0.182 276.935)" viewBox="0 0 48 48"><path d="M41 9h-1.15a4.9 4.9 0 0 0-1.2-2.71c-.57-.56.09-2-2.27-3.19-2-1-3.43.73-4.17-.48A4.65 4.65 0 0 0 28 0a6.58 6.58 0 0 0-4.57 1.65C22.72.75 21.49 0 19 0a3.31 3.31 0 0 0-3.41 2.4c-.56 1.43-2.13-.24-4 .71-2.38 1.17-1.74 2.63-2.3 3.18A4.9 4.9 0 0 0 8.09 9H7a2 2 0 0 0-2 2v1a3 3 0 0 0 2.06 2.83C9.29 47.23 9 42.26 9 45a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3c0-2.78-.28 2.14 1.94-30.17A3 3 0 0 0 43 12v-1a2 2 0 0 0-2-2zM30.5 3.65A3 3 0 0 0 33.91 5a2.5 2.5 0 0 1 1.58-.08c1.42.71.5 1.57 1.74 2.82A2.66 2.66 0 0 1 37.82 9h-5c-.67-2.65-3.45-3.73-6.12-3.94-1.58-.12-1.85-.38-2.31-1.56A4.71 4.71 0 0 1 28 2a2.7 2.7 0 0 1 2.5 1.65zM10.71 7.71C12 6.46 11 5.6 12.44 4.9a2.17 2.17 0 0 1 1.46 0 3 3 0 0 0 3.55-1.81C17.75 2.34 18 2 19 2c5.4 0 1.62 4.59 7.53 5.05 1.47.12 3.49.64 4.15 2H10.12a2.66 2.66 0 0 1 .59-1.34zM37.07 42H10.93L9.07 15h29.86zM37 45a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-1h26zm4-33a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1h34z"/><path d="M25 38V20a1 1 0 0 0-2 0v18a1 1 0 0 0 2 0zM32 38.06l1-18a1 1 0 0 0-2-.12l-1 18a1 1 0 0 0 2 .12zM18 37.94l-1-18a1 1 0 0 0-2 .12l1 18a1 1 0 0 0 2-.12z"/></svg></span>
  </button>
        </div>
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
            :key="`${category.id}-${expense.id}`"
            class="hover:bg-indigo-700 dark:hover:bg-purple-700 transition"
          >
            <td
              class="relative flex border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none w-full"
            >
              <input
                type="text"
                v-model="expense.subcategory"
                class="outline-none grow"
                @blur="updateExpense(expense)"
              />
              <span v-if="expense.expected" class="text-indigo-400">
                <input
                  type="text"
                  v-model="expense.expected"
                  class="w-12 outline-none"
                  @blur="updateExpense(expense)"
                />
                <span class="absolute inset-y-2.5 right-1.5 text-md">%</span>
              </span>
            </td>
            <td class="text-sm text-gray-300 dark:text-gray-300">
              <input
                type="text"
                name="expense"
                id=""
                v-model="expense.expense"
                class="border border-gray-700 px-4 py-3 outline-none w-full"
                @blur="updateExpense(expense)"
              />
            </td>
            <td class="relative text-sm text-gray-300 dark:text-gray-300">
              <input
                type="number"
                v-model="expense.amount"
                class="border border-gray-700 px-4 py-3 w-full outline-none"
                @blur="updateExpense(expense)"
              />
              <span class="absolute inset-y-2.5 right-1.5 text-md">€</span>
            </td>
            <td class="relative text-sm text-gray-300 dark:text-gray-300">
              <input
                type="number"
                step="0.01"
                v-model="expense.amount_percent"
                class="border border-gray-700 px-4 py-3 w-full outline-none"
                @blur="updateExpense(expense)"
              />
              <span class="absolute inset-y-2.5 right-1.5 text-md">%</span>
            </td>
            <td class="text-sm text-gray-300 dark:text-gray-300">
              <select
                name="banks"
                id="banks"
                v-model="expense.bank"
                @change="updateExpense(expense)"
                class="border border-gray-700 px-4 py-3 w-full outline-none"
              >
                <option v-for="bank in banks" :key="bank.id" :value="bank" class="bg-gray-700">
                  {{ bank.name }}
                </option>
              </select>
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none"
            ></td>
          </tr>
          <tr>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none"
            ></td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none"
            ></td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none"
            >
              <span v-if="category.expenses">
                {{
                  category.expenses
                    .reduce(
                      (sum, expense) => sum + parseFloat(expense.amount || 0),
                      0
                    )
                    .toFixed(2)
                }}
              </span>
              €
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none"
            >
            <span v-if="category.expenses">
              {{
                category.expenses
                  .reduce(
                    (sum, expense) =>
                      sum + parseFloat(expense.amount_percent || 0),
                    0
                  )
                  .toFixed(2)
              }}</span>%
            </td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none"
            ></td>
            <td
              class="border border-gray-700 px-4 py-3 text-sm text-gray-300 dark:text-gray-300 outline-none"
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
     <div ref="container" class="bg-gray-200 rounded relative w-full h-[80px] m-auto flex items-center justify-center overflow-hidden">
    <button @click="reset">
      Reset
    </button>
    <div
      ref="target"
      class="absolute w-full h-full top-0 left-0 bg-[#3eaf7c] flex items-center justify-center"
      :class="{ 'transition-all duration-200 ease-linear': !isSwiping }"
      :style="{ left, opacity }"
    >
      <p class="flex text-white items-center">
        Swipe <mdi-arrow-right />
      </p>
    </div>
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
import { ref,computed, onMounted } from "vue";
import axios from "axios";
import ToggleTheme from "./ToggleTheme.vue";
import { useAuth } from "../auth.ts";
import { generateExpenseHtml } from "./generateExpenseHtml";
import type {User, Category, Expense, Bank, nameList } from "../assets/types.ts";
import { useStorage } from "@vueuse/core";
import { useToast } from "vue-toastification";
import { useDebounceFn } from "@vueuse/core";
import type { UseSwipeDirection } from '@vueuse/core'
import { usePointerSwipe } from '@vueuse/core'
const target = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)

const containerWidth = computed(() => container.value?.offsetWidth)

const left = ref('0')
const opacity = ref(1)

function reset() {
  left.value = '0'
  opacity.value = 1
}

const { distanceX, isSwiping } = usePointerSwipe(target, {
  disableTextSelect: true,
  onSwipe(e: PointerEvent) {
    if (containerWidth.value) {
      if (distanceX.value < 0) {
        const distance = Math.abs(distanceX.value)
        left.value = `${distance}px`
        opacity.value = 1.25 - distance / containerWidth.value
      }
      else {
        left.value = '0'
        opacity.value = 1
      }
    }
  },
  onSwipeEnd(e: PointerEvent, direction: UseSwipeDirection) {
    if (distanceX.value < 0 && containerWidth.value && (Math.abs(distanceX.value) / containerWidth.value) >= 0.5) {
      left.value = '100%'
      opacity.value = 0
    }
    else {
      left.value = '0'
      opacity.value = 1
    }
  },
})


const toast = useToast();
const token = useStorage<string | null>("token", null);
axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
const user = useStorage<User | null>("user", null, undefined, {
  serializer: {
    read: (v) => (v ? JSON.parse(v) : null),
    write: (v) => JSON.stringify(v),
  },
});
const { logout, checkTokenValidity } = useAuth();

const categories = ref<Category[]>([]);
const banks = ref<Bank[]>([]);
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
    toast.error("Error fetching categories");
  }
};

const fetchBanks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/banks");
    banks.value = response.data;
  } catch (error) {
    toast.error("Error fetching categories");
  }
};

const addCategory = async () => {
const nameList = [
  'Rent', 'Mortgage', 'Utilities', 'Electricity', 'Water', 'Gas', 'Internet', 'Phone', 
  'Groceries', 'Dining Out', 'Transportation', 'Car Payment', 'Gasoline', 'Public Transit', 
  'Insurance', 'Health Insurance', 'Car Insurance', 'Home Insurance', 'Life Insurance', 
  'Entertainment', 'Streaming Services', 'Movies', 'Concerts', 'Hobbies', 'Subscriptions', 
  'Gym Membership', 'Clothing', 'Shoes', 'Accessories', 'Healthcare', 'Medications', 
  'Doctor Visits', 'Dentist', 'Vision Care', 'Savings', 'Emergency Fund', 'Retirement', 
  'Investments', 'Education', 'Tuition', 'Books', 'School Supplies', 'Childcare', 
  'Babysitting', 'Daycare', 'Travel', 'Flights', 'Hotels', 'Vacation', 'Gifts', 
  'Donations', 'Charity', 'Home Maintenance', 'Repairs', 'Furniture', 'Decor', 
  'Pet Care', 'Pet Food', 'Vet Visits', 'Taxes', 'Income Tax', 'Property Tax', 
  'Credit Card Payments', 'Loan Payments', 'Student Loans', 'Personal Loans', 
  'Miscellaneous', 'Coffee', 'Snacks', 'Personal Care', 'Haircuts', 'Cosmetics', 
  'Laundry', 'Cleaning Supplies', 'Office Supplies', 'Software', 'Hardware', 
  'Gadgets', 'Memberships', 'Clubs', 'Fitness Classes', 'Sports', 'Recreation', 
  'Parking', 'Tolls', 'Rideshare', 'Alcohol', 'Tobacco', 'Gaming', 'Apps', 
  'Online Courses', 'Workshops', 'Conferences', 'Home Improvement', 'Gardening', 
  'Tools', 'Electronics', 'Appliances', 'Jewelry', 'Wedding', 'Baby Expenses', 
  'Child Support', 'Alimony', 'Legal Fees', 'Bank Fees', 'ATM Fees', 'Late Fees', 
  'Interest', 'Dividends', 'Rental Income', 'Side Hustle', 'Freelance', 'Business Expenses'
];
  const newCategory = {
    name: nameList[Math.floor(Math.random() * nameList.length)],
    expected: 0,
    expenses: [],
    user_id: user.value.id,
  };
  try {
    const response = await axios.post(
      "http://localhost:8000/api/categories",
      newCategory
    );
    categories.value.push(response.data);
    toast.success("Category added successfully!"); // Success toast
  } catch (error) {
    console.error("Error adding category:", error);
    toast.error("Failed to add category!"); // Error toast
  }
};

const updateCategory = useDebounceFn(async (category) => {
  try {
    await axios.put(`http://localhost:8000/api/categories/${category.id}`, {
      name: category.name,
      expected: parseInt(category.expected),
    });
    toast.success("Category updated successfully!");
  } catch (error) {
    console.error("Error updating category:", error);
    toast.error("Failed to update category!");
  }
}, 1000);

const updateExpense = useDebounceFn(async (expense: Expense) => {
  try {
    await axios.put(`http://localhost:8000/api/expenses/${expense.id}`, {
      id: expense.id,
      subcategory:
       expense.subcategory ?? null,
      expense: expense.expense,
      amount: expense.amount,
      amount_percent: expense.amount_percent,
      bank: expense.bank.id ? expense.bank : [],
      expected: expense.expected ?? 0,
    });
    toast.success("Expense updated successfully!");
  } catch (error) {
    console.error("Error updating Expense:", error);
    toast.error("Failed to update Expense!");
  }
}, 1000);

const updateBank = useDebounceFn(async (bank: Bank) => {
  try {
    await axios.put(`http://localhost:8000/api/banks/${bank.id}`, {
      id: bank.id,
      name: bank.name,
    });
    toast.success("Bank updated successfully!");
  } catch (error) {
    console.error("Error updating Bank:", error);
    toast.error("Failed to update Bank!");
  }
}, 1000);

const deleteCategory = async (category: Category) => {
  var result = confirm("Want to delete?");
if (!result) {
  return;
}
  try {
    await axios.delete(`http://localhost:8000/api/categories/${category.id}`);
    categories.value = categories.value.filter((cat) => cat.name !== category.name);
    toast.success("Category deleted successfully!");
  } catch (error) {
    console.error("Error deleting category:", error);
    toast.error("Failed to delete category!"); // Error toast
  }
};
onMounted(() => {
  fetchCategories();
  fetchBanks();
  checkTokenValidity(user.value.token);
});
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
