"use client";

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

import { getOrderList } from "@/api/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import OrderItemDto from "@/types/order-item.dto";
import OrderDto from "@/types/order.dto";
import ProductDto from "@/types/product.dto";

export default function Kitchen() {
  const [newOrders, setNewOrders] = useState<OrderDto[]>([]);

  const getOrders = async () => {
    const res = await getOrderList();

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.data;
  };

  const fetchOrders = async () => {
    const allOrders = await getOrders();
    setNewOrders(allOrders);
  };

  useEffect(() => {
    const product: ProductDto = {
      name: "Smash da casa",
      description: "2x hamburguers ...",
      price: 30.5,
      imagePath: "hamburguer.jpg",
      code: "123",
    };
    const items: OrderItemDto[] = [];
    items.push(new OrderItemDto(product, 3, [], "tirar a cebola"));
    items.push(new OrderItemDto({ ...product, name: "x-burguer" }));
    const clientName = "João";
    const code = "201";
    const newOrder = new OrderDto(items, clientName, code);
    setNewOrders([
      newOrder,
      new OrderDto([new OrderItemDto(product, 2), items[1]], "Paola", "202"),
    ]);

    // fetchOrders();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 px-12 py-12 sm:px-32">
      <div className="flex flex-row items-center justify-around">
        <div>
          <p className="font-bold text-2xl">Preparando:</p>
          <div className="flex flex-col gap-3">
            {newOrders.map((newOrder) => (
              <Card className="border-8">
                <CardHeader>
                  <CardTitle>{`${newOrder.code} - ${newOrder.clientName}`}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-row items-center justify-between p-2">
                    <div className="flex flex-col items-center gap-3">
                      {newOrder.items.map((orderItem) => (
                        <Card>
                          <CardContent className="flex flex-col items-center gap-3 w-full">
                            <div className="flex flex-row items-center gap-6 p-3">
                              <div className="">
                                <Image
                                  alt={orderItem.product.name}
                                  src={`/${orderItem.product.imagePath}`}
                                  height={85}
                                  width={85}
                                  className="rounded-lg"
                                />
                              </div>
                              <div className="flex flex-col gap-6 w-48">
                                <div>
                                  <p className="font-bold">
                                    {orderItem.quantity +
                                      "× " +
                                      orderItem.product.name}
                                  </p>
                                  <p className="font-extralight text-xs">
                                    {orderItem.product.description}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {orderItem.notes && (
                              <div className="p-3">
                                <p className="font-bold">Observações:</p>
                                <Textarea disabled={true}>
                                  {orderItem.notes}
                                </Textarea>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="flex flex-row gap-1">
                      <Button variant="secondary" size="icon">
                        <FontAwesomeIcon
                          className="text-destructive"
                          icon={faXmark}
                        />
                      </Button>
                      <Button variant="secondary" size="icon">
                        <FontAwesomeIcon
                          className="text-primary"
                          icon={faCheck}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
