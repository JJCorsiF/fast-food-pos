// import { URLSearchParams } from "url";

import { HttpConnector } from "@/api/http-connector";
import HttpStatusCode from "./http-status-code.enum";

export class FetchHttpConnector implements HttpConnector {
  private readonly baseURL: string;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  completeUrl(url: string, params: string[][] = []) {
    let completeUrl = this.baseURL + url;

    if (params.length > 0) {
      completeUrl += "?" + new URLSearchParams(params).toString();
    }

    return completeUrl;
  }

  async get(
    url: string,
    params: string[][] = [],
    config: any = {},
  ): Promise<{ data: any; ok: boolean; status: number }> {
    const completeUrl = this.completeUrl(url, params);

    const response = await fetch(completeUrl, {
      ...config,
      method: "get",
      // next: { revalidate: 10 }
    });

    return {
      data: await response.json(),
      ok: response.status === HttpStatusCode.Ok,
      status: response.status,
    };
  }

  async post(
    url: string,
    payload?: object,
    config: any = {},
  ): Promise<{ data: any; ok: boolean; status: number }> {
    const response = await fetch(this.baseURL + url, {
      ...config,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    return {
      data: await response.json(),
      ok: response.status === HttpStatusCode.Created,
      status: response.status,
    };
  }

  async put(
    url: string,
    payload?: object,
    config: any = {},
  ): Promise<{ data: any; ok: boolean; status: number }> {
    const response = await fetch(this.baseURL + url, {
      ...config,
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    return {
      data: await response.json(),
      ok:
        response.status === HttpStatusCode.Ok ||
        response.status === HttpStatusCode.NoContent,
      status: response.status,
    };
  }

  async delete(
    url: string,
    config: any = {},
  ): Promise<{ data: any; ok: boolean; status: number }> {
    const response = await fetch(this.baseURL + url, {
      ...config,
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return {
      data: await response.json(),
      ok:
        response.status === HttpStatusCode.Ok ||
        response.status === HttpStatusCode.Accepted ||
        response.status === HttpStatusCode.NoContent,
      status: response.status,
    };
  }
}
