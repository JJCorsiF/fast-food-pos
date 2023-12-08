<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $availableMethods = ["debit", "credit", "money"];

        for ($i = 0; $i < 3; $i++) {
            $paymentMethods = [];

            array_push($paymentMethods, $availableMethods[array_rand($availableMethods)]);

            Order::create([
                'clientName' => $faker->name(),
                'code' => $faker->numerify(),
                'paymentMethods' => json_encode($paymentMethods),
                'payed' => $faker->randomFloat(2, 0, 200),
                'change' => 0
            ]);
        }
    }
}
