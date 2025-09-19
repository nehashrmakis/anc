<?php 
namespace App\Http\Controllers;
use App\Models\Invoice;

public function dashboardData()
{
    $inTransitInvoices = Invoice::with(['assignment.agent']) // eager load
        ->where('on_transit', 'In water')
        ->get();

    return Inertia::render('DashboardMain', [
        'inTransitInvoices' => $inTransitInvoices,
    ]);
}
