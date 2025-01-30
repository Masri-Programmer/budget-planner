<?php

namespace Database\Seeders;

use App\Models\{Category, Expense, Bank, User};
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Mohamad Masri',
            'password' => bcrypt('password'),
        ]);

        // Load banks from the JSON file
        $banks = json_decode(file_get_contents(database_path('seeders/data.json')), true)['banks'];

        $bankIds = [];
        foreach ($banks as $bankName) {
            $bank = Bank::firstOrCreate(['name' => $bankName]);
            $bankIds[$bankName] = $bank->id;
        }

        $categories = json_decode(file_get_contents(database_path('seeders/data.json')), true)['categories'];

        foreach ($categories as $catData) {
            $category = Category::firstOrCreate([
                'name' => $catData['name'],
                'user_id' => $user->id,
            ], [
                'expected' => $catData['expected'],
            ]);

            foreach ($catData['expenses'] as $expData) {
                Expense::create([
                    'category_id' => $category->id,
                    'subcategory' => $expData['subcategory'] ?? null,
                    'expense' => $expData['expense'],
                    'amount' => $expData['amount'],
                    'bank_id' => isset($expData['bank']) && isset($bankIds[$expData['bank']])
                        ? $bankIds[$expData['bank']] : null,
                    'user_id' => $user->id,
                    'expected' => !empty($expData['expected']) ? $expData['expected'] : null,
                ]);
            }
        }
    }
}
