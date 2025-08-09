export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  orderOption?: "dine-in" | "takeaway";
  timeSlot?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  orderOption: "dine-in" | "takeaway";
  timeSlot: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
}