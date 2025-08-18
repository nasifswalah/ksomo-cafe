export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  orderOption?: "dine-in" | "takeaway";
  timeSlot?: string;
}