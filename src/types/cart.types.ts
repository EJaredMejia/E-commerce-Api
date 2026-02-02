export interface ParamsAddCart {
  productId: number;
  quantity: number;
}

export interface UpdateCart {
  productId: number;
  newQty: number;
}

export interface DeleteCart {
  id: number;
}
export interface PurchaseCart {
  street: string;
  zipCode: string;
  city: string;
}
