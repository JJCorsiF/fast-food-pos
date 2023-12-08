<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductItem::truncate();

        $product = Product::all()->random();

        ProductItem::create([
            'name' => "Cheddar",
            'description' => '10g',
            'price' => 1.50,
            'imagePath' => "hamburguer.jpg",

            'product_id' => $product->id
        ]);

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 3; $i++) {
            $product = Product::all()->random();

            $description = "{$faker->randomNumber(2)}g";

            ProductItem::create([
                'name' => $faker->words(1, true),
                'description' => $description,
                'price' => $faker->randomFloat(2, 0, 10),
                'imagePath' => "hamburguer.jpg",

                'product_id' => $product->id
            ]);;
        }
    }
}
