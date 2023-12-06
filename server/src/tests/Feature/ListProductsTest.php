<?php

namespace Tests\Feature\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ListProductsTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testProductsAreListedCorrectly(): void
    {
        $firstProduct = [
            'name' => 'hamburguer',
            'description' => 'com bastante queijo',
            'price' => 25.5,
            'imagePath' => 'hamburguer.jpg'
        ];
        $secondProduct = [
            'name' => 'hamburguer duplo',
            'description' => 'dupla porção de queijo',
            'price' => 29.9,
            'imagePath' => 'hamburguer.jpg'
        ];
        Product::factory()->create($firstProduct);
        Product::factory()->create($secondProduct);

        $response = $this->get('/api/products');

        $response->assertJson(fn (AssertableJson $json) =>
            $json->each(fn (AssertableJson $json) =>
                $json->has('price')
                    ->etc()
                    ->whereType('price', 'double')
            )
        );

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['id', 'name', 'description', 'price', 'imagePath']
            ])
            ->assertJsonFragment($firstProduct)
            ->assertJsonFragment($secondProduct);
    }
}
