import Image from "next/image";
import React from "react";

import { Card, CardContent, CardFooter } from "./ui/card";

interface CategoryCardProps {
  categoryName: string;
  imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  imageSrc,
}) => {
  return (
    <Card className="w-64 sm:w-52">
      <CardContent className="flex items-center justify-center w-full mt-6">
        <Image alt={categoryName} src={`/${imageSrc}`} height={85} width={85} />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="font-bold text-center">{categoryName}</p>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
