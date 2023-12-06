<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::truncate();

        Product::create([
            'name' => "Smash da casa",
            'description' => '2× hambúrguer 200g',
            'price' => 30.50,
            'imagePath' => "hamburguer.jpg",
            'code' => '123'
        ]);;

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 11; $i++) {
            Product::create([
                'name' => $faker->words(3, true),
                'description' => $faker->sentence(3),
                'price' => $faker->randomFloat(2, 0, 100),
                'imagePath' => "hamburguer.jpg", //$faker->imageUrl(640, 480, 'food', true)
                'code' => fake()->numerify()
            ]);;
        }
    }
}
