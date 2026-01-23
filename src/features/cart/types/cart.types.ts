export interface Cart {
  id: number;
  product: {
    title: string;
    id: number;
    price: number;
  };
  quantity: number;
}

export interface PurchaseCart {
  street: string;
  colony: string;
  zipCode: string;
  city: string;
  references: string;
}

export interface CartResponse {
  data: {
    cart: {
      productInCarts: Cart[];
    };
  };
}
