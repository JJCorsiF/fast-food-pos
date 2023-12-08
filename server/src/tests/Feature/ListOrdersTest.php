<?php

namespace Tests\Feature\Feature;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ListOrdersTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testOrdersAreListedCorrectly(): void
    {
        $firstOrder = [
            'clientName' => 'João',
            'paymentMethods' => json_encode(["credit"]),
            'payed' => 30.5,
            'change' => 0,
            'code' => "201"
        ];
        $secondOrder = [
            'clientName' => 'José',
            'paymentMethods' => json_encode(["debit"]),
            'payed' => 72.5,
            'change' => 0,
            'code' => "202"
        ];
        Order::factory()->create($firstOrder);
        Order::factory()->create($secondOrder);

        $response = $this->get('/api/orders');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['id', 'clientName', 'items', 'paymentMethods', 'payed', 'change', 'code'],
            ])
            ->assertJsonFragment($firstOrder)
            ->assertJsonFragment($secondOrder);
    }
}
