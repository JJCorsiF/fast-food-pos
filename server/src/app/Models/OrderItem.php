<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class OrderItem extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = ['quantity', 'notes'];

    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }

    public function extras(): BelongsToMany {
        return $this->belongsToMany(ProductItem::class);
    }
}
