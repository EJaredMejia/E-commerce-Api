export interface Product {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  description: string;
  productImgs: {
    id: number;
    imgUrl: string;
  }[];
}

export interface ProductsResponse {
  data: {
    products: Product[];
  };
}