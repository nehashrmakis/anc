<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
use Inertia\Inertia;
use App\Models\Invoice;
use App\Models\InvoiceContainer;
use Illuminate\Support\Facades\DB;
use App\Models\Port;
use App\Models\Agent;
use App\Models\InvoiceProduct;
use App\Models\InvoiceAssignment;

class InvoiceController extends Controller
{
public function index(Request $request)
{
    $query = Invoice::with('containers.products.inventory');

    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where(function ($q) use ($search) {
            $q->where('invoice_no', 'like', "%{$search}%")
              ->orWhere('po_number', 'like', "%{$search}%")
              ->orWhere('supplier', 'like', "%{$search}%");
        });
    }

    if ($request->has('port') && $request->port !== '') {
        $query->where('arrival_depo', $request->port);
    }

    $invoices = $query->get();

    $agentList = Agent::select('id', 'name')->get();
    $portList = Port::select('id', 'name', 'location')->get();

    $mappedInvoices = $invoices->map(function ($invoice) {
        $isAssigned = DB::table('invoice_assignments')->where('invoice_id', $invoice->id)->exists();

        return [
            'id' => $invoice->id,
            'invoice_number' => $invoice->invoice_no,
            'po_number' => $invoice->po_number,
            'supplier' => $invoice->supplier,
            'agent' => $invoice->arrival_depo,
            'transit' => $invoice->on_transit,
            'arrival_date' => $invoice->landing_date,
            'is_assigned' => $isAssigned,
            'marking' => $invoice->containers->flatMap(function ($c) {
                return $c->products->pluck('marking');
            })->unique()->implode(', '),
            'containers' => $invoice->containers->map(function ($container) {
                return [
                    'id' => $container->id,
                    'container_number' => $container->container_id,
                    'products' => $container->products->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'inventory_id' => $product->inventory_id,
                            'name' => optional($product->inventory)->name,
                            'marking' => $product->marking,
                            'size' => optional($product->inventory)->size . ' ' . optional($product->inventory)->size_unit,
                            'weight' => optional($product->inventory)->weight . ' ' . optional($product->inventory)->weight_unit,
                            'qty' => $product->total_product,
                        ];
                    }),
                ];
            }),
        ];
    });

    return Inertia::render('InvoiceList', [
        'invoices' => $mappedInvoices,
        'agentList' => $agentList,
        'portList' => $portList,
        'filters' => [
            'search' => $request->input('search'),
            'port' => $request->input('port'),
        ],
        'title' => 'Invoices List',
    ]);
}

    
   
   
    public function create(){
        return Inertia::render('AddInvoice', [
            'inventory' => Inventory::select('id', 'name',  'size', 'size_unit','weight','weight_unit')->get(),
            'ports' => Port::select('id', 'name',  'location')->get(),
            'suppliers' => \App\Models\Supplier::select('id', 'name')->get(),
            'title' => 'Add New Invoice',
        ]);
    }
   public function store(Request $request)
{
    $validated = $request->validate([
        'invoice_no' => 'required|string',
        'po_number' => 'required|string',
        'supplier' => 'required|string',
        'arrival_depo' => 'required|string',
        'on_transit' => 'required|string',
        'landing_date' => 'required|date',

        'containers' => 'required|array|min:1',
        'containers.*.id' => 'required|string',
        'containers.*.products' => 'required|array|min:1',
        'containers.*.products.*.inventory_id' => 'required|integer|exists:inventories,id',
        'containers.*.products.*.marking' => 'required|string',
        'containers.*.products.*.size' => 'required|numeric',
        'containers.*.products.*.weight' => 'required|numeric',
        'containers.*.products.*.total_bundles' => 'required|integer',
        'containers.*.products.*.quantity_per_bundle' => 'required|integer',
        'containers.*.products.*.total_product' => 'required|integer',
    ]);

    DB::transaction(function () use ($validated) {
        $invoice = Invoice::create([
            'invoice_no' => $validated['invoice_no'],
            'po_number' => $validated['po_number'],
            'supplier' => $validated['supplier'],
            'arrival_depo' => $validated['arrival_depo'],
            'on_transit' => $validated['on_transit'],
            'landing_date' => $validated['landing_date'],
        ]);

        foreach ($validated['containers'] as $containerData) {
            $container = $invoice->containers()->create([
                'container_id' => $containerData['id'],
            ]);

            foreach ($containerData['products'] as $productData) {
                $container->products()->create(array_merge($productData, [
                    'invoice_id' => $invoice->id,
                ]));
            }
        }
    });

    return redirect()->route('invoice.index')->with('success', 'Invoice created successfully.');
}

public function update(Request $request, Invoice $invoice)
{
    $validated = $request->validate([
        'invoice_no' => 'required|string',
        'po_number' => 'required|string',
        'supplier' => 'required|string',
        'arrival_depo' => 'required|string',
        'on_transit' => 'required|string',
        'landing_date' => 'required|date',

        'containers' => 'required|array|min:1',
        'containers.*.id' => 'required|string',
        'containers.*.products' => 'required|array|min:1',
        'containers.*.products.*.inventory_id' => 'required|integer|exists:inventories,id',
        'containers.*.products.*.marking' => 'required|string',
        'containers.*.products.*.size' => 'required|numeric',
        'containers.*.products.*.weight' => 'required|numeric',
        'containers.*.products.*.total_bundles' => 'required|integer',
        'containers.*.products.*.quantity_per_bundle' => 'required|integer',
        'containers.*.products.*.total_product' => 'required|integer',
    ]);

    DB::transaction(function () use ($invoice, $validated) {
        $invoice->update([
            'invoice_no' => $validated['invoice_no'],
            'po_number' => $validated['po_number'],
            'supplier' => $validated['supplier'],
            'arrival_depo' => $validated['arrival_depo'],
            'on_transit' => $validated['on_transit'],
            'landing_date' => $validated['landing_date'],
        ]);

        $existingContainers = $invoice->containers->keyBy('container_id');
        $usedContainerIds = [];

        foreach ($validated['containers'] as $containerData) {
            $containerId = $containerData['id'];
            $usedContainerIds[] = $containerId;

            if ($existingContainers->has($containerId)) {
                $container = $existingContainers[$containerId];
                $container->products()->delete();

                foreach ($containerData['products'] as $productData) {
                    $container->products()->create(array_merge($productData, [
                        'invoice_id' => $invoice->id,
                    ]));
                }
            } else {
                $container = $invoice->containers()->create([
                    'container_id' => $containerId,
                ]);

                foreach ($containerData['products'] as $productData) {
                    $container->products()->create(array_merge($productData, [
                        'invoice_id' => $invoice->id,
                    ]));
                }
            }
        }

        // Delete containers not in use
        $invoice->containers()->whereNotIn('container_id', $usedContainerIds)->each(function ($container) {
            $container->products()->delete();
            $container->delete();
        });
    });

    return redirect()->route('invoice.index')->with('success', 'Invoice updated successfully.');
}

    public function edit(Invoice $invoice)
{
    $invoice->load('containers.products');

    return Inertia::render('AddInvoice', [
        'invoice' => $invoice,
        'inventory' => Inventory::select('id', 'name', 'size', 'size_unit', 'weight', 'weight_unit')->get(),
        'ports' => Port::select('id', 'name', 'location')->get(),
        'suppliers' => \App\Models\Supplier::select('id', 'name')->get(),
        'title' => 'Edit Invoice',
    ]);
}

public function updateProductQuantity(Request $request, $id)
{
    $validated = $request->validate([
        'qty' => 'required|integer|min:0',
    ]);

    $product = InvoiceProduct::findOrFail($id);
    $product->total_product = $validated['qty'];
    $product->save();

    return response()->json(['success' => true]);
}


public function addPort(Request $request)
{
    try {
        $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'invoice_agent' => 'required|string',
            'agent_id' => 'required|exists:agents,id',
            'agent_name' => 'required|string',
        ]);

        // Optional: delete previous assignment for same invoice if needed
        InvoiceAssignment::where('invoice_id', $request->invoice_id)->delete();

        // Create a new assignment
        InvoiceAssignment::create([
            'invoice_id' => $request->invoice_id,
            'port'       => $request->invoice_agent,
            'agent_id'   => $request->agent_id,
            'agent_name' => $request->agent_name,
        ]);

        return response()->json(['message' => 'Agent assigned successfully.']);
    } catch (\Exception $e) {
     //   \Log::error('AddPort Error: ' . $e->getMessage());
        return response()->json(['message' => 'Server error: ' . $e->getMessage()], 500);
    }
}
public function editForAgent(Agent $agent, Invoice $invoice)
{
    $invoice->load('containers.products');
    

    return Inertia::render('EditInvoice', [
        'agent' => $agent,
        'invoice' => $invoice,
        'inventory' => Inventory::select('id', 'name', 'size', 'size_unit', 'weight', 'weight_unit')->get(),
        'ports' => Port::select('id', 'name', 'location')->get(),
        'title' => 'Edit Agent Invoice',
    ]);
}
public function updateAdditionalFields(Request $request, $agentId, Invoice $invoice)
{
   
    $validated = $request->validate([
        'vat_invoice' => 'nullable|string',
        'misc_invoices' => 'nullable|array',
        'misc_invoices.*.invoice' => 'nullable|string',
        'misc_invoices.*.remark' => 'nullable|string',
        'etd' => 'nullable|date',
        'landing_date' => 'nullable|date',
        'remarks' => 'nullable|string',
        'clearance_invoice_no' => 'nullable|string'
    ]);

    $invoice->vat_invoice = $validated['vat_invoice'] ?? null;
    $invoice->misc_invoices = $validated['misc_invoices'] ?? [];
    $invoice->etd = $validated['etd'] ?? null;
    $invoice->landing_date = $validated['landing_date'] ?? null;
    $invoice->remarks = $validated['remarks'] ?? null;
     $invoice->clearance_invoice_no = $validated['clearance_invoice_no'] ?? null;
    $invoice->save();

    //return redirect()->back()->with('success', 'Invoice updated successfully.');
    return redirect("/agents/{$agentId}/invoices")->with('success', 'Invoice updated successfully.');


}
public function addMiscInvoice(Request $request, $agentId, Invoice $invoice)
{
    \Log::info('MISC REQUEST:', $request->all()); // 

    $validated = $request->validate([
    'misc_invoices' => 'required|array',
    'misc_invoices.*.invoice' => 'required|string', 
    'misc_invoices.*.remark' => 'nullable|string',
]);
    $invoice->update([
    'misc_invoices' => $validated['misc_invoices'],
]);


   

    return back()->with('success', 'Misc invoice rows added successfully.');
}


}
