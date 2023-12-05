import Image from "next/image";
import React from "react";

import { Card, CardContent, CardFooter } from "./ui/card";

// import { Container } from './styles';

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
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center w-full mt-6">
        <Image alt={productName} src={`/${imageSrc}`} height={85} width={85} />
        <p className="font-bold text-center">{productName}</p>
        <p className="font-extralight text-center">{productDescription}</p>
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
