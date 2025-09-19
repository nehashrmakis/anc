<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PortController;

Route::post('/addagent', [AgentController::class, 'store']);
Route::get('/showdata', [AgentController::class, 'showdata'])->name('agent.showdata');

Route::get('/agents/{agent}/edit', [AgentController::class, 'edit'])->name('agent.edit');
Route::put('/agents/{agent}', [AgentController::class, 'update'])->name('agent.update');

 
Route::post('/addsupplier', [SupplierController::class, 'store']);
Route::get('/showsuppdata', [SupplierController::class, 'showsuppdata'])->name('supplier.showsuppdata');

Route::get('/suppliers/{supplier}/edit', [SupplierController::class, 'edit'])->name('supplier.edit');
Route::put('/suppliers/{supplier}', [SupplierController::class, 'update'])->name('supplier.update');

Route::post('/addport', [PortController::class, 'store']);
Route::get('/showsport', [PortController::class, 'showsuppdata'])->name('port.showsuppdata');

Route::get('/ports/{port}/edit', [PortController::class, 'edit'])->name('port.edit');
Route::put('/ports/{port}', [PortController::class, 'update'])->name('port.update');

require __DIR__.'/auth.php';
