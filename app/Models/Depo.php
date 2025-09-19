<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Depo extends Model
{
    protected $fillable = ['name', 'email', 'location', 'contact_number'];
}
