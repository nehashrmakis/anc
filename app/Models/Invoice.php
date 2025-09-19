<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'invoice_no', 'po_number', 'supplier', 'arrival_depo', 'on_transit', 'landing_date',
          'vat_invoice',
        'misc_invoices',
        'etd',
        'landing_date',
        'remarks',
        'clearance_invoice_no',
    ];
protected $casts = [
        'misc_invoices' => 'array', // stored as JSON in DB
        'etd' => 'date',
        'landing_date' => 'date',
    ];
    public function containers()
    {
        return $this->hasMany(InvoiceContainer::class);
    }
    public function getEtdAttribute($value)
{
    return \Carbon\Carbon::parse($value)->format('Y-m-d');
}

public function getLandingDateAttribute($value)
{
    return \Carbon\Carbon::parse($value)->format('Y-m-d');
}
public function products()
{
    return $this->hasMany(InvoiceProduct::class, 'invoice_id');
}
// app/Models/Invoice.php

protected $appends = ['already_in_inventory'];

public function getAlreadyInInventoryAttribute()
{
    return \App\Models\FinalInventory::where('invoice_id', $this->id)->exists();
}
public function assignment()
{
    return $this->hasOne(InvoiceAssignment::class);
}
public function arrivalPort()
{
    return $this->hasOne(Port::class, 'name', 'arrival_depo');
}

}
