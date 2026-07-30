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


export interface PlanOption {
  id: string;
  title: string;
  description: string;
  price: number;
  highlightedText?: string;
  compareAtPrice?: number;
}

export interface Step {
  id: number;
  title: string;
  category: string;
  icon: string;
  expandedByDefault: boolean;
  products: Product[];
  plans?: PlanOption[];
}

export interface SummaryData {
  shipping: number;
  financingPerMonth: number;
  guaranteeTitle: string;
  guaranteeDescription: string;
}

export interface ProductsData {
  steps: Step[];
  summary: SummaryData;
}

export interface SelectedVariant {
  productId: string;
  variantId: string;
  quantity: number;
}