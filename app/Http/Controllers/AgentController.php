<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\InvoiceAssignment;
use App\Models\Invoice;
use App\Models\InvoiceContainer;
use App\Models\Agent;
use Inertia\Inertia;
use App\Models\Port;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$agents = Agent::select('id', 'name', 'email', 'location', 'contact_number')->latest()->get();   
        return Inertia::render('AgentList', [
         
            'title' => 'Agents',
        ]);
    }

    public function showdata()
{
    $agents = Agent::with(['invoiceAssignments.invoice:id,invoice_no,vat_invoice']) // Only fetch invoice_no
        ->select('id', 'name', 'email', 'location', 'contact_number')
        ->latest()
        ->get();

    return response()->json([
        'agents' => $agents
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
 
        $existingAgent = Agent::where('email', $request->email)->first();
        if ($existingAgent) {
            return response()->json(['message' => 'Agent with this email already exists.'], 400);
        }

        Agent::create([
            'name' => $request->name,
            'email' => $request->email,
            'location' => $request->location,
            'contact_number' => $request->contact_number,   
        ]);
        
        return response()->json(['message' => 'Agent created.'], 200);
         
    }

    public function edit(Request $request, string $id)
    {
        $agent = Agent::findOrFail($id);
        //echo "<pre>"; print_r($category); echo "</pre>"; die;

        return response()->json([
            'agent' => $agent,
            'message' => 'Edit Agent.'
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
        
        $existingAgent = Agent::where('email', $request->email)->where('id', '!=', $id)->first();
        if ($existingAgent) {
            return response()->json(['message' => 'Agent with this email already exists.'], 400);
        }
        $agent = Agent::findOrFail($id);
        $agent->update([
            'name' => $request->name,
            'email' => $request->email,
            'location' => $request->location,
            'contact_number' => $request->contact_number,   
        ]);
        
        return response()->json(['message' => 'Agent updated.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    
public function viewInvoices($id)
{
    $agent = Agent::findOrFail($id);

    $assignments = InvoiceAssignment::with('invoice.containers', 'invoice.arrivalPort')
        ->where('agent_id', $id)
        ->get();

    $invoices = $assignments->pluck('invoice')->filter();

    return Inertia::render('AgentInvoiceList', [
        'agent' => $agent,
        'title' => 'Agent Invoice Details',
        'invoices' => $invoices->values()
    ]);
}

}
