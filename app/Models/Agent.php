<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    protected $fillable = ['name', 'email', 'location', 'contact_number'];
    // app/Models/Agent.php

  public function invoiceAssignments()
{
    return $this->hasMany(\App\Models\InvoiceAssignment::class, 'agent_id');
}


}
