export interface Product {
  id?: string | number,
  img?: string,
  title?: string,
  price?: number,
  color?: string,
  type?: string,
  stock?: number,
  seller?: string,
  description?: string
}

export interface CartItem {
  productId: string
  title: string
  price: number
  img: string
  quantity: number
}
export interface State {
  user: {
    id: string;
    name: string;
    email: string;
  };
  productInfo: Product,
  cartItems: CartItem[],
  items: Product[],
}