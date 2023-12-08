"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import { getProductList } from "@/api/product";
import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import ProductDetailsCard from "@/components/product-details-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import OrderItemDto from "@/types/order-item.dto";
import PreOrderDto from "@/types/preorder.dto";
import ProductDto from "@/types/product.dto";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrderItem, setSelectedOrderItem] =
    useState<OrderItemDto | null>(null);
  const [quantity, setQuantity] = useState<number>(
    selectedOrderItem?.quantity ?? 1,
  );
  const [preOrder, setPreOrder] = useState<PreOrderDto | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItemDto[]>([]);

  const categories = [
    { name: "Combos", imageSrc: "combos.png" },
    { name: "Acompanhamentos", imageSrc: "acompanhamentos.jpg" },
    { name: "Bebidas", imageSrc: "bebidas.png" },
    { name: "Sobremesas", imageSrc: "sobremesas.jpg" },
  ];

  const addItemToOrder = (item: OrderItemDto | null) => {
    if (item) {
      let updatedOrderItems;
      const existingOrderItem = orderItems.find(
        (orderItem) => orderItem.product.code === item.product.code,
      );
      if (existingOrderItem) {
        existingOrderItem.quantity = item.quantity;
        updatedOrderItems = [
          ...orderItems.filter(
            (orderItem) => orderItem.product.code !== item.product.code,
          ),
          existingOrderItem,
        ];
      } else {
        updatedOrderItems = [...orderItems, item];
      }
      setOrderItems(updatedOrderItems);
      if (preOrder) {
        preOrder.items = updatedOrderItems;
      }
    }
  };

  const removeItemFromOrder = (orderItem: OrderItemDto | null) => {
    if (orderItem) {
      let updatedOrderItems = orderItems.filter(
        (item) => item.product.code !== orderItem.product.code,
      );
      setOrderItems(updatedOrderItems);
      if (preOrder) {
        preOrder.items = updatedOrderItems;
      }
    }
  };

  const onSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.target.value);
  };

  const getProducts = async () => {
    const res = await getProductList();

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.data;
  };

  const fetchProducts = async () => {
    const allProducts = await getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  };

  useEffect(() => {
    fetchProducts();

    const preOrderData = localStorage.getItem("order");

    if (preOrderData === null) {
      setPreOrder(new PreOrderDto([]));
      return;
    }

    const savedPreOrder = JSON.parse(preOrderData);

    const savedProductItems = savedPreOrder._items.map((orderItem: any) => {
      return new OrderItemDto(
        orderItem._product,
        orderItem._quantity,
        orderItem._extras,
        orderItem._notes,
      );
    });

    setPreOrder(new PreOrderDto(savedProductItems));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.code.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);

  const orderOverview = (
    <div id="order-details" className="w-96">
      <div className="">
        {orderItems.map((orderItem, idx) => (
          <div key={idx} className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <div>
                <span>
                  {orderItem.quantity + "× " + orderItem.product.name}
                </span>
                {orderItem.notes && (
                  <div>
                    <span className="pl-3 font-light">
                      {" "}
                      Obs: {orderItem.notes}
                    </span>
                  </div>
                )}
              </div>
              <Button
                size="icon"
                variant="destructive"
                className="w-6 h-6 rounded-full"
                onClick={() => removeItemFromOrder(orderItem)}
              >
                <TrashIcon height={16} width={16} />
              </Button>
            </div>

            <div>
              <span>{`R$${orderItem.subtotal
                .toFixed(2)
                .replace(/[,.]/g, (m) => (m === "," ? "." : ","))}`}</span>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <p>Total do pedido:</p>
        <p className="font-bold text-3xl">{`R$${preOrder?.price
          .toFixed(2)
          .replace(/[,.]/g, (m) => (m === "," ? "." : ","))}`}</p>
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 px-12 py-12 sm:px-32">
      <div className="flex flex-col self-start gap-3">
        <h2 className="font-bold text-left text-2xl">Seja bem vindo!</h2>
        <Input
          type="search"
          placeholder="O que você procura?"
          onChange={(ev) => onSearchChange(ev)}
        />
      </div>

      <div className="flex flex-col w-full gap-5">
        <div>
          <h3 className="font-bold text-left text-lg">Categorias</h3>
          <h4 className="text-left">Navegue por categoria</h4>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-x-24 sm:gap-y-6">
          {categories.map((category, idx) => (
            <CategoryCard
              key={idx}
              imageSrc={category.imageSrc}
              categoryName={category.name}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-5">
        <div>
          <h3 className="font-bold text-left text-lg">Produtos</h3>
          <h4 className="text-left">
            Selecione um produto para adicionar ao seu pedido
          </h4>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-x-24 sm:gap-y-6">
          <Dialog>
            {filteredProducts.map((product, idx) => (
              <DialogTrigger
                onClick={() => {
                  const existingOrderItem = preOrder?.items.find(
                    (item) => item.product.code === product?.code,
                  );

                  let orderItem = existingOrderItem;

                  if (!orderItem) {
                    orderItem = new OrderItemDto(product, 1, []);
                  } else {
                    orderItem?.addQuantity();
                  }

                  setSelectedOrderItem(orderItem);
                  setQuantity(orderItem?.quantity ?? 1);
                }}
              >
                <ProductCard
                  key={idx}
                  imageSrc={product.imagePath}
                  productDescription={product.description}
                  productName={product.name}
                  productPrice={product.price}
                />
              </DialogTrigger>
            ))}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <h2 className="font-bold text-left text-2xl">
                    Revise seu pedido!
                  </h2>
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="">
                <ProductDetailsCard
                  orderItem={selectedOrderItem}
                  quantity={quantity}
                  setQuantity={(q) => {
                    setQuantity(q);
                    if (selectedOrderItem) {
                      setSelectedOrderItem(
                        new OrderItemDto(
                          selectedOrderItem.product,
                          Number(q.valueOf()),
                          selectedOrderItem.extras,
                          selectedOrderItem.notes,
                        ),
                      );
                    }
                  }}
                />

                <h3 className="font-bold text-left text-lg">Adicionais</h3>
                <h4 className="text-left">
                  Selecione os ingredientes que você quer adicionar a mais no
                  seu lanche
                </h4>

                <div id="notes" className="w-full">
                  <Label htmlFor="note" className="font-bold">
                    Observações
                  </Label>
                  <Textarea
                    id="note"
                    placeholder="Adicione uma observação ao pedido"
                    onChange={(ev) => {
                      if (selectedOrderItem) {
                        selectedOrderItem.notes = ev.target.value;
                      }
                    }}
                  />
                </div>

                <div
                  id="order-summary"
                  className="flex flex-col justify-between h-24 mb-6"
                >
                  <div className="flex flex-row justify-between">
                    <div>
                      <span>
                        {quantity + "× " + selectedOrderItem?.product.name}
                      </span>
                    </div>
                    <div>
                      <span>{`R$${selectedOrderItem?.subtotal
                        .toFixed(2)
                        .replace(/[,.]/g, (m) =>
                          m === "," ? "." : ",",
                        )}`}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p>Subtotal:</p>
                    <p className="font-bold text-3xl">{`R$ ${selectedOrderItem?.subtotal
                      .toFixed(2)
                      .replace(/[,.]/g, (m) => (m === "," ? "." : ","))}`}</p>
                  </div>
                </div>

                <div className="flex justify-center sm:justify-end w-full">
                  <div className="flex flex-row gap-4">
                    <DialogClose asChild>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-primary border-primary font-semibold"
                      >
                        Continuar adicionando
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        size="lg"
                        className="font-semibold"
                        onClick={() => {
                          addItemToOrder(selectedOrderItem);
                          setSelectedOrderItem(null);
                        }}
                      >
                        Adicionar ao pedido
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {orderItems.length > 0 && orderOverview}

      <div className="flex justify-center sm:justify-end w-full">
        <div className="flex flex-row gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border border-primary text-primary font-semibold"
            disabled={orderItems.length < 1}
          >
            Cancelar
          </Button>
          <Button
            size="lg"
            disabled={orderItems.length < 1}
            onClick={() => {
              localStorage.setItem("order", JSON.stringify(preOrder));
            }}
          >
            <Link href={"/checkout"}>Finalizar pedido</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
