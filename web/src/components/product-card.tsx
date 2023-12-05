import Image from "next/image";
import React from "react";

import { Card, CardContent, CardFooter } from "./ui/card";

interface ProductCardProps {
  productName: string;
  imageSrc: string;
  productDescription: string;
  productPrice: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  productDescription,
  productName,
  productPrice,
}) => {
  return (
    <Card className="w-64 sm:w-52">
      <CardContent className="flex flex-col items-center justify-center w-full mt-6 gap-2">
        <Image alt={productName} src={`/${imageSrc}`} height={85} width={85} />
        <div className="flex flex-col">
          <p className="font-bold text-center">{productName}</p>
          <p className="font-extralight text-center text-xs">
            {productDescription}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="font-bold text-center">
          {`R$${productPrice
            .toFixed(2)
            .replace(/[,.]/g, (m) => (m === "," ? "." : ","))}`}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
