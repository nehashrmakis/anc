<?php
// app/Models/DispatchHistory.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DispatchHistory extends Model
{
    protected $table = 'dispatch_history';

    protected $fillable = [
        'product_id', 'invoice_id','product_name', 'size',
        'quantity', 'total_weight', 'arrival_depo', 'dispatched_at',
    ];
}
