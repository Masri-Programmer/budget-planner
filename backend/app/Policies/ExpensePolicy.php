<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\User;

class ExpensePolicy
{
    /**
     * Determine whether the user can view any expenses.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view a specific expense.
     */
    public function view(User $user, Expense $expense): bool
    {
        return $user->id === $expense->category->user_id;
    }

    /**
     * Determine whether the user can create a new expense.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the expense.
     */
    public function update(User $user, Expense $expense): bool
    {
        return $user->id === $expense->category->user_id;
    }

    /**
     * Determine whether the user can delete the expense.
     */
    public function delete(User $user, Expense $expense): bool
    {
        return $user->id === $expense->category->user_id;
    }

    /**
     * Determine whether the user can restore the expense.
     */
    public function restore(User $user, Expense $expense): bool
    {
        return $user->id === $expense->category->user_id;
    }

    /**
     * Determine whether the user can permanently delete the expense.
     */
    public function forceDelete(User $user, Expense $expense): bool
    {
        return $user->id === $expense->category->user_id;
    }
}
