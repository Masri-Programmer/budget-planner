<?php

namespace Database\Seeders;

use App\Models\{Category, Expense, Bank, User};

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Mohamad Masri',
            'password' => bcrypt('password'),
        ]);

        $banks = [
            "Basic Fit",
            "Otto",
            "Vodafone",
            "Octopus",
            "Gewoba",
            "Flyerheaven",
            "Paypal",
            "Sparkasse",
            "Bolt",
            "Tap Tap Send",
            "ADC Auto",
            "Trading Republic",
            "Netflix / Amazon",
            "DB Ticket",
            "Steuererklärung",
            "Benzin",
            "Deutsche Bahn",
            "GoFundMe",
            "PC"
        ];

        $bankIds = [];
        foreach ($banks as $bankName) {
            $bank = Bank::firstOrCreate(['name' => $bankName]);
            $bankIds[$bankName] = $bank->id;
        }

        $categories = [
            [
                "name" => "Grundlegende Ausgaben",
                "expected" => "50-60",
                "expenses" => [
                    ["subcategory" => "Wohnen", "expense" => "Miete", "amount" => 670, "bank" => "Gewoba"],
                    ["subcategory" => "Lebensmittel", "expense" => "Essen", "amount" => 300, "bank" => "Octopus"],
                    ["subcategory" => "Transportation", "expense" => "Bus & Bolt", "amount" => 15, "bank" => "DB Ticket"],
                    ["expense" => "Benzin", "amount" => 90, "bank" => "ADC Auto"],
                    ["expense" => "Autoversicherung", "amount" => 90, "bank" => "ADC Auto"],
                    ["subcategory" => "Gesundheit", "expense" => "Gym", "amount" => 45, "bank" => "Basic Fit"],
                    ["subcategory" => "Sonstige Grundausgaben", "expense" => "Strom und Gas", "amount" => 100, "bank" => "Octopus"],
                    ["expense" => "Internet", "amount" => 50, "bank" => "Vodafone"],
                    ["expense" => "Handy", "amount" => 80, "bank" => "O2"],
                ]
            ],
            [
                "name" => "Ersparnisse & Investitionen",
                "expected" => "20-30",
                "expenses" => [
                    ["subcategory" => "Langfristige Ersparnisse", "expense" => "Rente Plus", "amount" => 200, "bank" => "C24"],
                    ["subcategory" => "Kurzfristige Ersparnisse", "expense" => "Verbleibende Ersparnisse", "amount" => 1457, "bank" => "C24"],
                    ["subcategory" => "Trading", "expense" => "Eli Lilly", "amount" => 10, "bank" => "Trading Republic"],
                    ["expense" => "Intuitive Surgical", "amount" => 10, "bank" => "Trading Republic"],
                    ["expense" => "TSMC (ADR)", "amount" => 10, "bank" => "Trading Republic"],
                    ["expense" => "Physical Gold USD (Acc)", "amount" => 10, "bank" => "Trading Republic"],
                    ["expense" => "NVIDIA", "amount" => 10, "bank" => "Trading Republic"],
                    ["expense" => "Core S&P 500 USD (Acc)", "amount" => 10, "bank" => "Trading Republic"],
                ]
            ],
            [
                "name" => "Lifestyle & Freizeit",
                "expected" => "10-20",
                "expenses" => [
                    ["subcategory" => "Unterhaltung & Genuss", "expense" => "Ausgehen", "amount" => 100, "bank" => null],
                    ["expense" => "Amazon", "amount" => 4.50, "bank" => "Amazon"],
                    ["expense" => "Netflix", "amount" => 4.99, "bank" => "Amazon"],
                    ["expense" => "Friseur", "amount" => 30, "bank" => null],
                    ["expense" => "Reisen", "amount" => 250, "bank" => "DB Ticket"],
                    ["subcategory" => "Kleidung & Einkäufe", "expense" => "Kleidung", "amount" => 50, "bank" => "Otto"],
                    ["subcategory" => "Hobbys & Persönliche Entwicklung", "expense" => "Watch Fit 3", "amount" => 10, "bank" => "Otto"],
                    ["expense" => "Laptop", "amount" => 22, "bank" => "Paypal"],
                ]
            ],
            [
                "name" => "Einnahmen",
                "expected" => "100",
                "expenses" => [
                    ["expense" => "Bafög", "amount" => 855, "bank" => null],
                    ["expense" => "Arbeit (ungefähr)", "amount" => 300, "bank" => null],
                    ["expense" => "Job", "amount" => 2300, "bank" => null],
                    ["expense" => "Kindergeld", "amount" => 0, "bank" => null],
                ]
            ]
        ];

        foreach ($categories as $catData) {
            $category = Category::firstOrCreate([
                'name' => $catData['name'],
                'expected' => $catData['expected'],
                'user_id' => $user->id,
            ]);

            foreach ($catData['expenses'] as $expData) {
                Expense::create([
                    'category_id' => $category->id,
                    'subcategory' => $expData['subcategory'] ?? null,
                    'expense' => $expData['expense'],
                    'amount' => $expData['amount'],
                    'bank_id' => $expData['bank'] ? ($bankIds[$expData['bank']] ?? null) : null,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
