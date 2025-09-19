<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'category_id',
        'size',
        'size_unit',
        'weight',
        'weight_unit',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
