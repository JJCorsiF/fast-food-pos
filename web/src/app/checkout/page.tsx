"use client";

import {
  faCreditCard,
  faMoneyBill1,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import OrderItemDto from "@/types/order-item.dto";
import PreOrderDto from "@/types/preorder.dto";

import familyDinner from "@/assets/images/family-eating-food-dinner.jpg";

export default function Checkout() {
  const [preOrder, setPreOrder] = useState<PreOrderDto | null>(null);

  const [payWithDebit, setPayWithDebit] = useState<boolean>(false);
  const [payWithCredit, setPayWithCredit] = useState<boolean>(false);
  const [payWithMoney, setPayWithMoney] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const preOrderData = localStorage.getItem("order");

    if (preOrderData === null) {
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
                    {preOrder?.items.map((orderItem, idx) => (
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
                  {preOrder && (
                    <div className="flex flex-row items-center justify-between">
                      <p>Total do pedido:</p>
                      <p className="font-bold text-3xl">{`R$ ${preOrder?.price
                        .toFixed(2)
                        .replace(/[,.]/g, (m) => (m === "," ? "." : ","))}`}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Nome do cliente</Label>
                <Input placeholder="Primeiro nome" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Código</Label>
                <Input value={200} disabled={true} />
              </div>
            </div>
          </div>
        </div>

        <div id="payment-methods" className="flex flex-col gap-3 self-start">
          <p className="font-bold">Selecione a forma de pagamento:</p>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Card>
                <CardContent className="flex items-center justify-between gap-2 pt-6">
                  <Label htmlFor="debit" className="flex gap-4">
                    <FontAwesomeIcon
                      className="text-primary"
                      icon={faCreditCard}
                    />{" "}
                    <div>
                      <span className="font-bold">Débito</span>
                    </div>
                  </Label>
                  <Checkbox
                    id="debit"
                    onCheckedChange={() => setPayWithDebit(!payWithDebit)}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between gap-2 pt-6">
                  <Label htmlFor="credit" className="flex gap-4">
                    <FontAwesomeIcon
                      className="text-primary"
                      icon={faCreditCard}
                    />{" "}
                    <div>
                      <span className="font-bold">Crédito</span>
                    </div>
                  </Label>
                  <Checkbox
                    id="credit"
                    onCheckedChange={() => setPayWithCredit(!payWithCredit)}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between gap-2 pt-6">
                  <Label htmlFor="money" className="flex gap-4">
                    <FontAwesomeIcon
                      className="text-primary"
                      icon={faMoneyBill1}
                    />{" "}
                    <div>
                      <span className="font-bold">Dinheiro</span>
                    </div>
                  </Label>
                  <Checkbox
                    id="money"
                    onCheckedChange={() => setPayWithMoney(!payWithMoney)}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Valor entregue</Label>
                <Input value={`R$ ${preOrder?.price ?? 0}`} />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Troco</Label>
                <Input value={`R$ ${0}`} disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center sm:justify-end w-full">
        <div className="flex flex-row gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border border-primary text-primary font-semibold"
          >
            Cancelar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="font-semibold"
                onClick={() => {
                  localStorage.removeItem("order");

                  setTimeout(() => {
                    router.push("/");
                  }, 3000);
                }}
                disabled={!(payWithDebit || payWithCredit || payWithMoney)}
              >
                Finalizar pedido
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">
              <div>
                <Image
                  alt="Family at dinner"
                  src={familyDinner}
                  height={285}
                  width={285}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-bold text-2xl">
                Pedido finalizado com sucesso!
              </h3>
              <h5 className="font-extralight">
                O pedido foi encaminhado para a cozinha
              </h5>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
