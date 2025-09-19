<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceContainer extends Model
{
    protected $fillable = ['invoice_id', 'container_id'];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function products()
    {
        return $this->hasMany(InvoiceProduct::class);
    }
}
