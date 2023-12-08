<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasUuids, HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'payed' => 'float',
        'change' => 'float'
    ];

    protected $fillable = ['clientName', 'code', 'paymentMethods', 'payed', 'change'];

    public function items(): HasMany {
        return $this->hasMany(OrderItem::class);
    }
}
