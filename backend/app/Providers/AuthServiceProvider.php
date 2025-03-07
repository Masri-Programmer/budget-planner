<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Expense;
use App\Models\Bank;
use App\Policies\CategoryPolicy;
use App\Policies\BankPolicy;
use App\Policies\ExpensePolicy;
// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Category::class => CategoryPolicy::class,
        Expense::class => ExpensePolicy::class,
        Bank::class => BankPolicy::class,
    ];
    /**
     * Register any authentication / authorization services.
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
