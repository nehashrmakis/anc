<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Port extends Model
{
     protected $fillable = ['id', 'name', 'location', 'is_main'];

}
