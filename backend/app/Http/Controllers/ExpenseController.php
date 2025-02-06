<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Bank;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(Request $request)
    // {
    //     $expenses = Expense::whereHas('category', function ($query) use ($request) {
    //         $query->where('user_id', $request->user()->id);
    //     })->with('category', 'bank')->get();

    //     return response()->json($expenses);
    // }

    public function show(Expense $expense)
    {
        $this->authorize('view', $expense);

        return response()->json($expense->load('category', 'bank'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'subcategory' => 'nullable',
            'expense' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'bank_id' => 'nullable|exists:banks,id',
            'expected' => 'nullable|numeric',
        ]);

        $category = Category::findOrFail($validated['category_id']);
        $this->authorize('update', $category);

        $expense = Expense::create($validated);

        return response()->json($expense, Response::HTTP_CREATED);
    }

    public function update(Request $request, Expense $expense)
    {
        $this->authorize('update', $expense);

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'subcategory' => 'sometimes',
            'expense' => 'sometimes|string|max:255',
            'amount' => 'sometimes|numeric',
            'bank_id' => 'sometimes|exists:banks,id',
            'expected' => 'sometimes|numeric',
            'bank' => 'sometimes|array',
            'bank.id' => 'required_with:bank|exists:banks,id',
            'bank.name' => 'required_with:bank|string|max:255',
        ]);

        if (isset($validated['category_id'])) {
            $category = Category::findOrFail($validated['category_id']);
            $this->authorize('update', $category);
        }

        // Update the bank if it is provided in the request
        if (isset($validated['bank'])) {
            $bank = Bank::findOrFail($validated['bank']['id']);
            $this->authorize('update', $bank);
            $bank->update(['name' => $validated['bank']['name']]);
            $validated['bank_id'] = $bank->id;
        }

        $expense->update($validated);

        return response()->json($expense->load('bank'));
    }


    public function destroy(Expense $expense)
    {
        $this->authorize('delete', $expense);

        $expense->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

}
