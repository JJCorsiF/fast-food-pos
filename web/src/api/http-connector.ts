import { baseURL } from "@/config";
import { FetchHttpConnector } from "@/types/fetch-http-connector";

export interface HttpConnector {
  get(
    url: string,
    params: string[][],
    config?: any,
  ): Promise<{ data: any; ok: boolean; status: number }>;
  post(
    url: string,
    payload?: object,
    config?: any,
  ): Promise<{ data: any; ok: boolean; status: number }>;

  put(
    url: string,
    payload?: object,
    config?: any,
  ): Promise<{ data: any; ok: boolean; status: number }>;
  delete(
    url: string,
    config?: any,
  ): Promise<{ data: any; ok: boolean; status: number }>;
}

export const httpConnector = new FetchHttpConnector({ baseURL });
