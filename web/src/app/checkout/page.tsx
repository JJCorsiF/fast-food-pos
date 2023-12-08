"use client";

import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderItemDto from "@/types/order-item.dto";
import OrderDto from "@/types/order.dto";

export default function Checkout() {
  const [order, setOrder] = useState<OrderDto | null>(null);

  const router = useRouter();

  useEffect(() => {
    const orderData = localStorage.getItem("order");

    if (orderData === null) {
      return;
    }

    const savedOrder = JSON.parse(orderData);

    const savedProductItems = savedOrder._items.map((orderItem: any) => {
      return new OrderItemDto(
        orderItem._product,
        orderItem._quantity,
        orderItem._extras,
        orderItem._notes,
      );
    });

    setOrder(new OrderDto(savedProductItems));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 px-12 py-12 sm:px-32">
      <div className="flex items-center self-start gap-4">
        <span className="font-bold text-primary">
          <FontAwesomeIcon icon={faWallet} />
        </span>{" "}
        <span className="font-bold text-2xl">Pagamento</span>
      </div>

      <div className="flex flex-row justify-evenly w-full">
        <div id="order-summary" className="flex flex-col gap-3 self-start">
          <p className="font-bold">Resumo da compra</p>
          <div className="flex flex-col gap-8">
            <Card>
              <CardContent className="py-3">
                <div
                  id="order-summary"
                  className="flex flex-col justify-between h-36"
                >
                  <div className="flex flex-col justify-between">
                    {order?.items.map((orderItem, idx) => (
                      <div className="flex flex-row justify-between">
                        <div>
                          <span>
                            {orderItem.quantity + "× " + orderItem.product.name}
                          </span>
                        </div>
                        <div>
                          <span>{`R$${orderItem.subtotal
                            .toFixed(2)
                            .replace(/[,.]/g, (m) =>
                              m === "," ? "." : ",",
                            )}`}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  {order && (
                    <div className="flex flex-row items-center justify-between">
                      <p>Total do pedido:</p>
                      <p className="font-bold text-3xl">{`R$ ${order?.price
                        .toFixed(2)
                        .replace(/[,.]/g, (m) => (m === "," ? "." : ","))}`}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </main>
  );
}
