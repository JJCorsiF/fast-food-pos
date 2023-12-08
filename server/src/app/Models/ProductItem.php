<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProductItem extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = ['name', 'description', 'price', 'imagePath'];

    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }

    public function orderItems(): BelongsToMany {
        return $this->belongsToMany(OrderItem::class);
    }
}
