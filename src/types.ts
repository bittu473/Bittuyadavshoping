export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSoldOut?: boolean;
  discount?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  specs: string[];
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  name: string;
  price: number;
  category: string;
  description: string;
  product: Product;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}
