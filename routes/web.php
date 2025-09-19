<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\FinalInventoryController;
use App\Http\Controllers\AgentController;   
use App\Http\Controllers\SupplierController; 
use App\Http\Controllers\PortController;
use App\Http\Controllers\DispatchHistoryController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Http\Controllers\QuickBooksController;


Route::get('/quickbooks/connect', [QuickBooksController::class, 'connect'])->name('quickbooks.connect');
Route::get('/quickbooks/callback', [QuickBooksController::class, 'callback'])->name('quickbooks.callback');


Route::get('/', [AuthenticatedSessionController::class, 'create']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
Route::get('/dashboard', function () {
    $inTransitInvoices = Invoice::with([
            'assignment.agent',
            'products.inventory'
        ])->where('on_transit', 'In water')->get();
     $inTransitCount = $inTransitInvoices->count();
    return Inertia::render('Dashboard', [
        'inTransitInvoices' => $inTransitInvoices,
         'inTransitCount' => $inTransitCount,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/inventory-category', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/add-category', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/inventory-category/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/inventory-category/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::get('/categories/{category}/inventory-products', [CategoryController::class, 'inventoryProducts'])->name('categories.inventoryProducts');
    Route::delete('/categories/{category}/inventory-products/{id}', [CategoryController::class, 'destroyinventory'])->name('categories.destroyinventory');
    Route::post('/inventory/send-to-main-port', [FinalInventoryController::class, 'sendToMainPort'])
    ->name('inventory.sendToMainPort');




    Route::get('/products', [InventoryController::class, 'index'])->name('inventory.index'); 
    Route::get('/add-product', [InventoryController::class, 'create'])->name('inventory.create');
    Route::post('/products', [InventoryController::class, 'store'])->name('inventory.store'); 
    Route::get('/proucts/{inventory}/edit', [InventoryController::class, 'edit'])->name('inventory.edit');
    Route::put('/products/{inventory}', [InventoryController::class, 'update'])->name('inventory.update');
    Route::delete('/products/{id}', [InventoryController::class, 'destroy'])->name('inventory.destroy');

    Route::get('/add-invoice', [InvoiceController::class, 'create'])->name('invoice.create');
    Route::post('/invoices', [InvoiceController::class, 'store'])->name('invoice.store');
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoice.index'); 
    Route::get('/invoices/{invoice}/edit', [InvoiceController::class, 'edit'])->name('invoice.edit');
    Route::put('/invoices/{invoice}', [InvoiceController::class, 'update'])->name('invoice.update');
    Route::put('/api/update-product-quantity/{id}', [InvoiceController::class, 'updateProductQuantity']);

    
    Route::get('/agents', [AgentController::class, 'index'])->name('agent.index');
    Route::get('/invoices/{id}/vat', function ($id) {
    $invoice = \App\Models\Invoice::select('id', 'vat_invoice')->findOrFail($id);

    return response()->json([
        'invoice_id' => $invoice->id,
        'vat_invoice' => $invoice->vat_invoice,
    ]);
});

    Route::get('/suppliers', [SupplierController::class, 'index'])->name('supplier.index');

    Route::get('/ports', [PortController::class, 'index'])->name('port.index');
    Route::post('/addport', [InvoiceController::class, 'addPort']);
    // FIX: use PortController instead of InvoiceController
    Route::post('/api/addport', [PortController::class, 'store']);
    Route::put('/api/ports/{id}', [PortController::class, 'update']);
    Route::get('/api/ports/{id}/edit', [PortController::class, 'edit']);
    Route::get('/api/showsport', [PortController::class, 'showsuppdata']);
    Route::delete('/api/ports/{id}', [PortController::class, 'destroy']);
    Route::post('/api/ports/{id}/set-main', [PortController::class, 'setMainPort']);

    // routes/web.php
    

    

    Route::get('/agents/{id}/invoices', [\App\Http\Controllers\AgentController::class, 'viewInvoices'])->name('agents.invoices');
    Route::get('/agents/{agent}/invoices/{invoice}/edit', [InvoiceController::class, 'editForAgent'])->name('agent.invoice.edit');
    Route::put('/agents/{agent}/invoices/{invoice}', [InvoiceController::class, 'updateAdditionalFields']);
    Route::post('/agents/{agent}/invoices/{invoice}/misc', [InvoiceController::class, 'addMiscInvoice']);
    Route::post('/agents/{agent}/invoices/{invoice}/inventory', [\App\Http\Controllers\FinalInventoryController::class, 'store'])
    ->name('final.inventory.store');
    
    

    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::get('/confirm-order', [CartController::class, 'confirm'])->name('cart.index');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

     Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');
   // Route::get('/confirm-order', [CartController::class, 'confirm'])->name('cart.confirm');

    Route::post('/confirm-dispatch', [DispatchHistoryController::class, 'store'])->name('dispatch.confirm');
    Route::get('/dispatch_history', [DispatchHistoryController::class, 'index'])->name('dispatch.history');

   // Route::get('/pprofile', [DispatchHistoryController::class, 'pprofile'])->name('dispatch.pprofile');
  //  Route::get('/compare', [DispatchHistoryController::class, 'compare'])->name('dispatch.compare');
   // Route::get('/edit_invoice', [DispatchHistoryController::class, 'edit_invoice'])->name('dispatch.edit_invoice');
   // Route::get('/confirm_order', [DispatchHistoryController::class, 'confirm_order'])->name('dispatch.confirm_order');
   // Route::get('/product_list', [DispatchHistoryController::class, 'product_list'])->name('dispatch.product_list');

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
