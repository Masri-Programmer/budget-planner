<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    /**
     * Determine whether the user can view any categories.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view a specific category.
     */
    public function view(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }

    /**
     * Determine whether the user can create a category.
     */
    public function create(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update a category.
     */
    public function update(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }

    /**
     * Determine whether the user can delete a category.
     */
    public function delete(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }

    /**
     * Determine whether the user can restore a category.
     */
    public function restore(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }

    /**
     * Determine whether the user can permanently delete a category.
     */
    public function forceDelete(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }
}
