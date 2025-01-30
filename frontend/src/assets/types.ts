// types.ts

export interface Bank {
  name: string;
}

export interface Expense {
  subcategory: string;
  expense: string;
  amount: string;
  amount_percent?: string;
  bank?: Bank;
  expected?: string;
}

export interface Category {
  name: string;
  expected: string;
  expenses: Expense[];
}
