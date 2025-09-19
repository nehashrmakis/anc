<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('SupplierList', [
         
            'title' => 'Suppliers',
        ]);
    }

    public function showsuppdata()
    {
        $supplier = Supplier::select('id', 'name', 'email', 'location', 'contact_number')->latest()->get();   

        return response()->json([
            'suppliers' => $supplier
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //echo "<pre>"; print_r($request->all()); echo "</pre>"; die;
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'location' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
        ]);
 
        $existingSupplier = Supplier::where('email', $request->email)->first();
        if ($existingSupplier) {
            return response()->json(['message' => 'Supplier with this email already exists.'], 400);
        }

        Supplier::create([
            'name' => $request->name,
            'email' => $request->email,
            'location' => $request->location,
            'contact_number' => $request->contact_number,   
        ]);
        
        return response()->json(['message' => 'Supplier created.'], 200);
         
    }

    public function edit(Request $request, string $id)
    {
        $supplier = Supplier::findOrFail($id);
        //echo "<pre>"; print_r($category); echo "</pre>"; die;

        return response()->json([
            'supplier' => $supplier,
            'message' => 'Edit Supplier.'
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'location' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
        ]);
        
        $existingAgent = Supplier::where('email', $request->email)->where('id', '!=', $id)->first();
        if ($existingAgent) {
            return response()->json(['message' => 'Supplier with this email already exists.'], 400);
        }
        $supplier = Supplier::findOrFail($id);
        $supplier->update([
            'name' => $request->name,
            'email' => $request->email,
            'location' => $request->location,
            'contact_number' => $request->contact_number,   
        ]);
        
        return response()->json(['message' => 'Supplier updated.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
