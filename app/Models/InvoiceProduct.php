<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceProduct extends Model
{
    protected $fillable = [
        'invoice_id',
        'inventory_id',
        'marking',
        'size',
        'weight',
        'total_bundles',
        'quantity_per_bundle',
        'total_product',
        'invoice_container_id',
    ];

    public function container()
    {
        return $this->belongsTo(InvoiceContainer::class);
    }
    public function inventory()
{
    return $this->belongsTo(Inventory::class, 'inventory_id');
}


}
