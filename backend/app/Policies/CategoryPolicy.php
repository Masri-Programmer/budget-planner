<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Category;

class CategoryPolicy
{
    /**
     * Determine if the user can update the category.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Category  $category
     * @return bool
     */
    public function update(User $user, Category $category)
    {
        return $user->id === $category->user_id;
    }
}