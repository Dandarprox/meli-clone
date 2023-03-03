import { api } from "./configs/axiosConfig";

export interface Product {
  author: {
    name: string;
    lastname: string;
  };
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
    category_path: {
      id: string;
      name: string;
    }[];
  }
}

async function fetchProducts(query: string): Promise<Product[]> {
  const searchParams = new URLSearchParams({ q: query, limit: "4" });
  const { data } = await api.get<Product[]>(`/v1?${searchParams}`);

  return data;
}

async function fetchProductDetail(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/v1/items/${id}`);

  return data;
}

const productsApi = {
  fetchProducts,
  fetchProductDetail,
};

export default productsApi;