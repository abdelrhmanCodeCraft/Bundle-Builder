export interface Variant {
  id: string;
  label: string;

  image: string;

  price: number;

  compareAtPrice: number | null;

  stock: number;
}

export interface Badge {
  text: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  badge: Badge | null;
  learnMore: string;
  hasVariants: boolean;
  variants: Variant[];
}

export interface PlanData {
  id: string;
  title: string;
  highlightedText?: string;
  price: number;
  compareAtPrice?: number;
}

export interface Step {
  id: number;
  title: string;
  category: string;
  expandedByDefault: boolean;
  products: Product[];
}

export interface ProductsData {
  steps: Step[];
  plan: PlanData;
}

export interface SelectedVariant {
  productId: string;
  variantId: string;
  quantity: number;
}