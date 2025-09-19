<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Models\Port;
use Inertia\Inertia;

class PortController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     
        return Inertia::render('PortList', [
         
            'title' => 'Port',
        ]);
    }

    public function showsuppdata()
    {
       $depo = Port::select('id', 'name', 'location', 'is_main')->latest()->get(); 

        return response()->json([
            'depos' => $depo
            
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
            'location' => 'required|string|max:255',
        ]);
 
        $existingDepo = Port::where('name', $request->name)->first();
        if ($existingDepo) {
            return response()->json(['message' => 'Port with this name already exists.'], 400);
        }

        Port::create([
            'name' => $request->name,
            'location' => $request->location,
        ]);
        
        return response()->json(['message' => 'Port created.'], 200);
         
    }

    public function edit(Request $request, string $id)
    {
        $depo = Port::findOrFail($id);
        //echo "<pre>"; print_r($category); echo "</pre>"; die;

        return response()->json([
            'depo' => $depo,
            'message' => 'Edit Port.'
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
             'location' => 'required|string|max:255',
         ]);
        
        $existingDepo = Port::where('name', $request->name)->where('id', '!=', $id)->first();
        if ($existingDepo) {
            return response()->json(['message' => 'Port with this name already exists.'], 400);
        }
        $depo = Port::findOrFail($id);
        $depo->update([
            'name' => $request->name,
             'location' => $request->location,
         ]);
        
        return response()->json(['message' => 'Depo updated.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $port = Port::findOrFail($id);
    $port->delete();

    return response()->json(['message' => 'Port deleted successfully.'], 200);
}
public function setMainPort($id)
{
    Port::query()->update(['is_main' => false]); // Reset all
    Port::where('id', $id)->update(['is_main' => true]); // Set selected

    return response()->json(['message' => 'Main port updated.']);
}


}
