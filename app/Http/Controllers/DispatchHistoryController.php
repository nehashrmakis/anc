<?php

namespace App\Http\Controllers;

use App\Models\DispatchHistory;
use App\Models\InvoiceProduct;
use App\Models\FinalInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DispatchHistoryController extends Controller
{
  public function store(Request $request)
{
    $cart = Session::get('cart', []);
  // dd($cart);

    if (empty($cart)) {
        return back()->with('error', 'Cart is empty.');
    }

    DB::beginTransaction();
    try {
        foreach ($cart as $item) {
            Log::info('Dispatching item from cart:', $item);

            // Match correct InvoiceProduct using inventory_id + size + weight
            $invoiceProduct = FinalInventory::where('inventory_id', $item['id'])
                ->where('invoice_id',  $item['invoice_id'])
               ->first();

            $invoiceId = $invoiceProduct ? $invoiceProduct->invoice_id : null;

            // Save to dispatch history
            DispatchHistory::create([
                'invoice_id'    => $invoiceId,
                'product_id'    => $item['id'],
                'product_name'  => $item['name'],
                'size'          => $item['size'] ?? null,
                'quantity'      => $item['quantity'],
                'total_weight'  => $item['weight'] * $item['quantity'],
                'arrival_depo'  => $item['arrival_depo'],
                'dispatched_at' => now(),
            ]);
        Log::info("saved  inventory_id {$item['id']} with invoice_id {$invoiceId}");
            // Update stocks
            if ($invoiceProduct) {
                // reduce from invoice_products
                $invoiceProduct->decrement('total_product', $item['quantity']);

                // reduce from final_inventories (only invoice_id + inventory_id exist there)
                $finalInventory = FinalInventory::where('inventory_id', $invoiceProduct->inventory_id)
                    ->where('invoice_id', $invoiceProduct->invoice_id)
                    ->where('arrival_port', $item['arrival_depo'])
                    ->first();

                if ($finalInventory) {
                    $finalInventory->decrement('quantity', $item['quantity']);
                }
            }

            Log::info("Stock updated for inventory_id {$item['id']} with invoice_id {$invoiceId}");
        }

        DB::commit();
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Error processing dispatch: ' . $e->getMessage());
        return back()->with('error', 'Failed to process dispatch.');
    }

    Session::forget('cart');

    return redirect()->route('dispatch.history')->with('success', 'Order confirmed and dispatch history saved.');
}




    public function index()
    {
        $dispatches = DispatchHistory::orderBy('dispatched_at', 'desc')->get();

        return Inertia::render('DispatchHistoryList', [
            'dispatches' => $dispatches,
            'title'      => 'Dispatch History',
        ]);
    }
}
