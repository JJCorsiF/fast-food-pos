import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-12">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-left">Seja bem vindo!</h2>
        <Input type="search" placeholder="O que você procura?" />
      </div>

      <div className="flex flex-col w-full gap-5">
        <div>
          <h3 className="font-bold text-left">Categorias</h3>
          <h4 className="text-left">Navegue por categoria</h4>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4">
          <CategoryCard imageSrc="combos.png" categoryName="Combos" />
          <CategoryCard
            imageSrc="acompanhamentos.jpg"
            categoryName="Acompanhamentos"
          />
          <CategoryCard imageSrc="bebidas.png" categoryName="Bebidas" />
          <CategoryCard imageSrc="sobremesas.jpg" categoryName="Sobremesas" />
        </div>
      </div>

      <div className="flex flex-col w-full gap-5">
        <div>
          <h3 className="font-bold text-left">Produtos</h3>
          <h4 className="text-left">
            Selecione um produto para adicionar ao seu pedido
          </h4>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4">
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
          <ProductCard
            imageSrc="hamburguer.jpg"
            productDescription="2× hambúrguer 200g"
            productName="Smash da casa"
            productPrice={30.5}
          />
        </div>
      </div>

      <div className="flex justify-center sm:justify-end w-full">
        <div className="flex flex-row gap-4">
          <Button variant="secondary" disabled={true}>
            Cancelar
          </Button>
          <Button disabled={true}>Finalizar pedido</Button>
        </div>
      </div>
    </main>
  );
}
