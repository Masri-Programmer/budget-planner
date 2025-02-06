<?php

namespace App\Policies;

use App\Models\Bank;
use App\Models\User;

class BankPolicy
{
    /**
     * Determine whether the user can view any banks.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view a specific bank.
     */
    public function view(User $user, Bank $bank): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create a new bank.
     */
    public function create(User $user): bool
    {
        return $user->is_admin; // Adjust based on your role logic
    }

    /**
     * Determine whether the user can update a bank.
     */
    public function update(User $user, Bank $bank): bool
    {
        return $bank->expenses()->whereHas('category', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->exists();
    }

    /**
     * Determine whether the user can delete the bank.
     */
    public function delete(User $user, Bank $bank): bool
    {
        return $bank->expenses()->whereHas('category', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->exists();
    }

    /**
     * Determine whether the user can restore a bank.
     */
    public function restore(User $user, Bank $bank): bool
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can permanently delete a bank.
     */
    public function forceDelete(User $user, Bank $bank): bool
    {
        return $user->is_admin;
    }
}
