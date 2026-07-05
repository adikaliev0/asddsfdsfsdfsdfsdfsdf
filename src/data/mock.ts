import { Product, User, Order } from '../types';

export const mockUser: User = {
  id: '123456789',
  firstName: 'Alex',
  username: 'alex_dev',
  languageCode: 'ru',
  totalPurchases: 3,
  totalAccountsIssued: 12,
};

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Standard CPM2 Account',
    description: 'Базовый аккаунт с начальным капиталом для комфортного старта. Включает 1,000,000 игровой валюты и базовые автомобили.',
    priceRub: 150,
    priceStars: 75,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
    features: ['1,000,000 валюты', '3 базовых авто', 'Мгновенная выдача'],
    rating: 4.8,
    reviewsCount: 124,
    discountTiers: [
      { quantity: 3, discountPercent: 10 },
      { quantity: 5, discountPercent: 20 },
    ],
  },
  {
    id: 'p2',
    name: 'Premium CPM2 Account',
    description: 'Премиум аккаунт со всеми открытыми локациями, 10,000,000 игровой валюты и 5 эксклюзивными автомобилями.',
    priceRub: 450,
    priceStars: 225,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1503376760366-50854cb04808?auto=format&fit=crop&q=80&w=600',
    features: ['10,000,000 валюты', 'Все локации', '5 эксклюзивных авто', 'VIP статус'],
    rating: 4.9,
    reviewsCount: 89,
    discountTiers: [
      { quantity: 2, discountPercent: 15 },
    ],
  },
  {
    id: 'p3',
    name: 'Ultimate Garage Bundle',
    description: 'Максимальный набор для коллекционеров. Содержит все автомобили в игре с полным тюнингом.',
    priceRub: 990,
    priceStars: 495,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600',
    features: ['Все авто в игре', 'Полный тюнинг (Max)', 'Бесконечная валюта', 'Уникальные винилы'],
    rating: 5.0,
    reviewsCount: 256,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-8492',
    date: '2023-10-24T14:30:00Z',
    items: [
      {
        product: mockProducts[0],
        quantity: 2,
        priceRub: 150,
        priceStars: 75,
      }
    ],
    totalRub: 300,
    totalStars: 150,
    status: 'completed',
    paymentMethod: 'stars',
    credentials: [
      { login: 'acc1_standard@cpm.io', pass: 'p@ssw0rd1' },
      { login: 'acc2_standard@cpm.io', pass: 'p@ssw0rd2' }
    ]
  },
  {
    id: 'ORD-9102',
    date: '2023-11-05T09:15:00Z',
    items: [
      {
        product: mockProducts[1],
        quantity: 1,
        priceRub: 450,
        priceStars: 225,
      }
    ],
    totalRub: 450,
    totalStars: 225,
    status: 'pending',
    paymentMethod: 'yoomoney',
  }
];
