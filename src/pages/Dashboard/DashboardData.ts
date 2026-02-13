
import { useFetch } from "@/services";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }



  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    image: string;
    address: {
      city: string;
      state: string;
      country: string;
    };
    company: {
      name: string;
      title: string;
    };
  }
  
  export interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
  }
  

  export type ProductCategory = string;




export const useProducts = () => {
    return useFetch<ProductsResponse>(["products"], "/products");
  };


  export const useUsers = () => {
    return useFetch<UsersResponse>(["users"], "/users");
  };


  export const useProductCategories = () => {
    return useFetch<ProductCategory[]>(["product-categories"], "/products/categories");
  };