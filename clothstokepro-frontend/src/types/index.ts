export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
