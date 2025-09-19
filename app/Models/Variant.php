<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $fillable = ['inventory_id', 'size', 'size_unit', 'weight', 'weight_unit'];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}
