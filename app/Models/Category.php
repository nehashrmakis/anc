<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'image'];
    // Category.php
public function inventories()
{
    return $this->hasMany(\App\Models\Inventory::class);
}

}

