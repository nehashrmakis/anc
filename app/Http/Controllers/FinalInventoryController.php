<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\FinalInventory;
use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Agent;
use App\Models\QuickBooksToken;
use Illuminate\Http\Request;
use QuickBooksOnline\API\DataService\DataService;
use QuickBooksOnline\API\Facades\Item;
use QuickBooksOnline\API\Facades\Account;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class FinalInventoryController extends Controller
{
    public function store(Request $request, $agentId, Invoice $invoice)
{
    $token = QuickBooksToken::latest()->first();

    if (!$token) {
        Log::error('QuickBooks token not found.');
        return back()->with('error', 'QuickBooks token not found.');
    }

    $realmId = $token->realm_id;

    $dataService = DataService::Configure([
        'auth_mode' => 'oauth2',
        'ClientID' => env('QUICKBOOKS_CLIENT_ID'),
        'ClientSecret' => env('QUICKBOOKS_CLIENT_SECRET'),
        'RedirectURI' => env('QUICKBOOKS_REDIRECT_URI'),
        'scope' => env('QUICKBOOKS_SCOPE', 'com.intuit.quickbooks.accounting'),
        'baseUrl' => 'https://sandbox-quickbooks.api.intuit.com',
        'accessTokenKey' => $token->access_token,
        'refreshTokenKey' => $token->refresh_token,
        'QBORealmID' => $realmId,
    ]);

    $dataService->throwExceptionOnError(true);

    try {
        Log::info('FinalInventory Store Request: ' . json_encode($request->all()));

        //$invoice->load(['containers.products', 'arrivalPort']); // Make sure arrivalPort relation exists
        $invoice->load(['containers.products.inventory', 'arrivalPort']);
        // Check if arrival port is main
        $isMainPort = $invoice->arrivalPort?->is_main ?? 0;

        DB::transaction(function () use ($invoice, $dataService, $isMainPort) {
            foreach ($invoice->containers as $container) {
                foreach ($container->products as $product) {
                    FinalInventory::create([
                        'invoice_id' => $invoice->id,
                        'invoice_container_id' => $container->id,
                        'invoice_product_id' => $product->id,
                        'inventory_id' => $product->inventory_id,
                        'arrival_port' =>$invoice->arrivalPort->name,
                        'quantity' =>  $product->total_product,
                        'finalized_at' => now(),
                    ]);

                    if (!$isMainPort) {
                        Log::info('Skipping QuickBooks Sync - Port is not main');
                        continue;
                    }

                    try {
                        $quickbooksItem = Item::create([
                            "Name" => ($product->inventory->name ?? 'Unnamed Product') . '-' . uniqid(),
                            "Type"            => "Inventory",
                            "TrackQtyOnHand"  => true,
                            "QtyOnHand"       => (int) $product->quantity,
                            "InvStartDate"    => now()->format('Y-m-d'),
                            "AssetAccountRef" => [
                                "value" => "81",
                                "name"  => "Inventory Asset"
                            ],
                            "IncomeAccountRef" => [
                                "value" => "79",
                                "name"  => "Sales of Product Income"
                            ],
                            "ExpenseAccountRef" => [
                                "value" => "80",
                                "name"  => "Cost of Goods Sold"
                            ]
                        ]);

                        $createdItem = $dataService->Add($quickbooksItem);

                        if (!$createdItem) {
                            $error = $dataService->getLastError();
                            Log::error('QuickBooks Add Error: ' . $error->getResponseBody());
                        } else {
                            Log::info('Item added to QuickBooks:', ['ItemId' => $createdItem->Id]);
                              Log::info('Item Name added to QuickBooks:', [ 'name' => $product->inventory->name ]);
                        }
                    } catch (\Exception $e) {
                        Log::error('QuickBooks Item Sync Exception: ' . $e->getMessage());
                    }
                }
            }
        });

        return response()->json(['success' => true, 'message' => 'Added to Final Inventory']);
    } catch (\Exception $e) {
        Log::error('FinalInventory Store Error: ' . $e->getMessage());
        return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()], 500);
    }
}



    public function viewInvoices($agentId)
    {
        $agent = Agent::findOrFail($agentId);
        $invoices = Invoice::with(['containers.products', 'miscInvoices'])->where('agent_id', $agentId)->get();

        foreach ($invoices as $invoice) {
            $invoice->already_in_inventory = FinalInventory::where('invoice_id', $invoice->id)->exists();
        }

        return Inertia::render('AgentInvoiceList', [
            'agent' => $agent,
            'invoices' => $invoices,
        ]);
    }
public function sendToMainPort(Request $request)
{
    $token = QuickBooksToken::latest()->first();

    if (!$token) {
        Log::error('QuickBooks token not found.');
        return back()->with('error', 'QuickBooks token not found.');
    }

    $realmId = $token->realm_id;

    $dataService = DataService::Configure([
        'auth_mode'       => 'oauth2',
        'ClientID'        => env('QUICKBOOKS_CLIENT_ID'),
        'ClientSecret'    => env('QUICKBOOKS_CLIENT_SECRET'),
        'RedirectURI'     => env('QUICKBOOKS_REDIRECT_URI'),
        'scope'           => env('QUICKBOOKS_SCOPE', 'com.intuit.quickbooks.accounting'),
        'baseUrl'         => 'https://sandbox-quickbooks.api.intuit.com',
        'accessTokenKey'  => $token->access_token,
        'refreshTokenKey' => $token->refresh_token,
        'QBORealmID'      => $realmId,
    ]);

    $dataService->throwExceptionOnError(true);

    try {
        $finalInventoryId = $request->input('final_inventory_id');
        $quantity = (int) $request->input('quantity');
        $selectedPortId = $request->input('port');

        $originalInventory = FinalInventory::with('invoiceProduct.inventory')->find($finalInventoryId);

        if (!$originalInventory) {
            throw ValidationException::withMessages([
                'final_inventory_id' => 'Related inventory not found.'
            ]);
        }

        $selectedPort = \App\Models\Port::find($selectedPortId);
        if (!$selectedPort) {
            throw ValidationException::withMessages([
                'port' => 'Selected port not found.'
            ]);
        }

        DB::transaction(function () use ($originalInventory, $quantity, $selectedPort, $dataService) {
            // 🔽 1. Check stock
            if ($originalInventory->quantity < $quantity) {
                throw ValidationException::withMessages([
                    'quantity' => 'Not enough stock in the original port.'
                ]);
            }

            // 🔽 2. Reduce from FinalInventory
            $originalInventory->quantity -= $quantity;
            $originalInventory->save();

            // 🔽 3. Reduce from invoice_products table also
            $invoiceProduct = $originalInventory->invoiceProduct;
            if ($invoiceProduct) {
                if ($invoiceProduct->total_product < $quantity) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Not enough stock in invoice products.'
                    ]);
                }

                $invoiceProduct->total_product -= $quantity;
                $invoiceProduct->save();
            }

            // 🔽 4. Create new inventory at selected port
            $newInventory = FinalInventory::create([
                'invoice_id'           => $originalInventory->invoice_id,
                'invoice_container_id' => $originalInventory->invoice_container_id,
                'invoice_product_id'   => $originalInventory->invoice_product_id,
                'inventory_id'         => $originalInventory->inventory_id,
                'finalized_at'         => now(),
                'arrival_port'         => $selectedPort->name,
                'quantity'             => $quantity,
            ]);

            Log::info('New inventory created for main port', ['data' => $newInventory]);

            // 🔽 5. Sync with QuickBooks (optional)
            try {
                $product = $originalInventory->invoiceProduct;

                if ($product && $product->inventory) {
                    $quickbooksItem = Item::create([
                        "Name"            => ($product->inventory->name ?? 'Unnamed Product') . '-' . uniqid(),
                        "Type"            => "Inventory",
                        "TrackQtyOnHand"  => true,
                        "QtyOnHand"       => (int) $quantity,
                        "InvStartDate"    => now()->format('Y-m-d'),
                        "AssetAccountRef" => ["value" => "81", "name" => "Inventory Asset"],
                        "IncomeAccountRef" => ["value" => "79", "name" => "Sales of Product Income"],
                        "ExpenseAccountRef" => ["value" => "80", "name" => "Cost of Goods Sold"]
                    ]);

                    $createdItem = $dataService->Add($quickbooksItem);

                    if (!$createdItem) {
                        $error = $dataService->getLastError();
                        Log::error('QuickBooks Add Error: ' . $error->getResponseBody());
                    } else {
                        Log::info('Item added to QuickBooks:', ['ItemId' => $createdItem->Id]);
                    }
                }
            } catch (\Exception $e) {
                Log::error('QuickBooks Item Sync Exception: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'Inventory sent to main port successfully.');
    } catch (ValidationException $e) {
        throw $e;
    } catch (\Exception $e) {
        \Log::error('Send to Main Port Exception', [
            'message' => $e->getMessage(),
            'trace'   => $e->getTraceAsString(),
        ]);

        throw ValidationException::withMessages([
            'general' => 'An unexpected error occurred while sending to main port.'
        ]);
    }
}





}