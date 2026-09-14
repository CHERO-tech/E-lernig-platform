export interface CartItem {
  id: string;
  title: string;
  instructor: string;
  price: number;
  image?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}
