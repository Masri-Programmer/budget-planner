<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Bank::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Bank::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $bank = Bank::create($validated);

        return response()->json($bank, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bank $bank)
    {
        $this->authorize('view', $bank);

        return response()->json($bank->load('expenses'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bank $bank)
    {
        $this->authorize('update', $bank);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
        ]);

        $bank->update($validated);

        return response()->json($bank);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bank $bank)
    {
        $this->authorize('delete', $bank);

        $bank->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
