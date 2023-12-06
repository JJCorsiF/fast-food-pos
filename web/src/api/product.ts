import { httpConnector } from "@/api/http-connector";
import ProductDto from "@/types/product.dto";

export const getProductList: () => Promise<{
  data: ProductDto[];
  ok: boolean;
  status: number;
}> = () => httpConnector.get("/products");
