import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const categories = [
    { name: "Combos", imageSrc: "combos.png" },
    { name: "Acompanhamentos", imageSrc: "acompanhamentos.jpg" },
    { name: "Bebidas", imageSrc: "bebidas.png" },
    { name: "Sobremesas", imageSrc: "sobremesas.jpg" },
  ];

  const products = [
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
    {
      description: "2× hambúrguer 200g",
      imageSrc: "hamburguer.jpg",
      name: "Smash da casa",
      price: 30.5,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 px-12 py-12 sm:px-32">
      <div className="flex flex-col self-start gap-3">
        <h2 className="font-bold text-left text-2xl">Seja bem vindo!</h2>
        <Input type="search" placeholder="O que você procura?" />
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
          {products.map((product, idx) => (
            <ProductCard
              key={idx}
              imageSrc={product.imageSrc}
              productDescription={product.description}
              productName={product.name}
              productPrice={product.price}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center sm:justify-end w-full">
        <div className="flex flex-row gap-4">
          <Button size="lg" variant="secondary" disabled={true}>
            Cancelar
          </Button>
          <Button size="lg" disabled={true}>
            Finalizar pedido
          </Button>
        </div>
      </div>
    </main>
  );
}
