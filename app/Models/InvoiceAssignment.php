<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceAssignment extends Model
{
    protected $fillable = ['invoice_id', 'port', 'agent_id', 'agent_name', 'is_main'];
    public function invoice()
{
    return $this->belongsTo(\App\Models\Invoice::class, 'invoice_id');
}
public function agent()
{
    return $this->belongsTo(Agent::class); // if agent name is in agents table
}

}

