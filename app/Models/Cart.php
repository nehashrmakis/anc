<?php

// app/Models/Cart.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['inventory_id', 'quantity'];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}

