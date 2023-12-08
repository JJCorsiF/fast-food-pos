import { httpConnector } from "@/api/http-connector";
import OrderDto from "@/types/order.dto";

export const getOrderList: () => Promise<{
  data: OrderDto[];
  ok: boolean;
  status: number;
}> = () => httpConnector.get("/orders");
