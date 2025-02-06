// types.ts

export interface User {
  id: Number;
  name: string;
  email: string;
}
export interface Bank {
  id: Number;
  name: string;
}

export interface Expense {
  id:Number;
  subcategory: string;
  expense: string;
  amount: string;
  amount_percent?: string;
  bank: Bank;
  expected?: Number;
}

export interface Category {
  id:Number,
  name: string;
  expected: string;
  expenses: Expense[];
}
