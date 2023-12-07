import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

import OrderItemDto from "@/types/order-item.dto";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface ProductDetailsCardProps {
  orderItem: OrderItemDto | null;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  orderItem,
  quantity,
  setQuantity,
}) => {
  if (orderItem === null) {
    return <></>;
  }

  const addQuantity = () => {
    orderItem.addQuantity();
    setQuantity(quantity + 1);
  };

  const subtractQuantity = () => {
    if (quantity > 0) {
      orderItem.subtractQuantity();
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-6">
        <div className="w-20 h-20">
          <Image
            alt={orderItem.product.name}
            src={`/${orderItem?.product.imagePath}`}
            height={85}
            width={85}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-bold">{orderItem?.product.name}</p>
            <p className="font-extralight text-xs">
              {orderItem?.product.description}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between border-2 border-solis border-primary rounded-full w-32">
            <Button
              className="bg-primary text-primary-foreground rounded-full"
              onClick={() => subtractQuantity()}
            >
              <MinusIcon />
            </Button>
            {quantity}
            <Button
              className="bg-primary text-primary-foreground rounded-full"
              onClick={() => addQuantity()}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <span className="font-bold">{`R$${orderItem.product.price
          .toFixed(2)
          .replace(/[,.]/g, (m) => (m === "," ? "." : ","))}`}</span>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
