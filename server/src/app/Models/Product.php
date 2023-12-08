<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'price' => 'float'
    ];

    protected $fillable = ['name', 'description', 'price', 'imagePath', 'code'];

    public function productItems(): HasMany {
        return $this->hasMany(ProductItem::class);
    }
}
