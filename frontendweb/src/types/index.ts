export interface User {
  id: number;
  name: string;
  lastName?: string;
  username: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface Group {
  id: number;
  name: string;
  date: string;
  members: number;
  receipts: number;
  totalAmount: number;
  image: string;
}

export interface GroupDetail {
  id: number;
  name: string;
  date: string;
  image: string;
  totalAmount: number;
  myAmount: number;
  members: Member[];
  receipts: Receipt[];
  balances: Balance[];
}

export interface Member {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export interface Receipt {
  id: number;
  name: string;
  amount: number;
  paidBy: string;
  date: string;
  image: string;
  status: 'pending' | 'settled';
  items: ReceiptItem[];
}

export interface ReceiptItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  assignedTo: Member[];
}

export interface Balance {
  id: number;
  from: string;
  to: string;
  amount: number;
  status: string;
  date: string;
}

export type BillStatus = 'pending' | 'settled';

export interface Bill {
  id: number;
  name: string;
  amount: number;
  paidBy: string;
  date: string;
  image: string;
  status: BillStatus;
  items: MenuItem[];
  groupId: number;
  currency: string;
  coverImage: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  assignedTo: Member[];
}