<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function list() {
        $orders = Order::with('items')->whereHas('items')->get()->map(function ($order) {
            $order->items = $order->items->map(function ($item) {
                return [
                    ...$item->toArray(),
                    'product' => Product::with('productItems')->find($item->product_id)
                ];
            });
            return [
                ...$order->toArray(),
                'items' => $order->items
            ];
        });
        return response()->json($orders);
    }

    public function create() {

    }
}
