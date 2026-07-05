export interface Product {
  id: string;
  name: string;
  description: string;
  priceRub: number;
  priceStars: number;
  stock: number;
  image: string;
  features: string[];
  rating: number;
  reviewsCount: number;
  discountTiers?: { quantity: number; discountPercent: number }[];
}

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode: string;
  totalPurchases: number;
  totalAccountsIssued: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  priceRub: number;
  priceStars: number;
}

export type PaymentMethod = 'stars' | 'yoomoney' | 'kaspi' | 'binance';
export type OrderStatus = 'pending' | 'completed' | 'failed';

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalRub: number;
  totalStars: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  credentials?: { login: string; pass: string }[];
}
