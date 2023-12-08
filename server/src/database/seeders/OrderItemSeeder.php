<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $allOrders = Order::all();
        $allProducts = Product::with('productItems')->whereHas('productItems')->get();

        // for ($i = 0; $i < 5; $i++) {
            $order = $allOrders->random();
            $product = $allProducts->random();

            $numberOfAvailableItems = $product->productItems()->count();

            $numberOfItemsAdded = $faker->numberBetween(0, $numberOfAvailableItems);

            $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $faker->numberBetween(1, 10),
                'notes' => $faker->text(25)
            ]);

            $productItemIds = [];

            for ($i = 0; $i < $numberOfItemsAdded; $i++) {
                $index = $faker->numberBetween(0, $numberOfAvailableItems - 1);

                array_push($productItemIds, $product->productItems()->get()[$index]->id);
            }

            $orderItem->extras()->sync($productItemIds, false);
        // }
    }
}
