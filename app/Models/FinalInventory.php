<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinalInventory extends Model
{
    protected $fillable = [
    'invoice_id',
    'invoice_container_id',
    'invoice_product_id',
    'inventory_id',
    'arrival_port',
    'quantity',
    'finalized_at',
];
public function invoiceProduct()
{
    return $this->belongsTo(\App\Models\InvoiceProduct::class, 'invoice_product_id');
}


}
