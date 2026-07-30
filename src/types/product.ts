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

/**
 * A subscription option in the "Choose your plan" step. Plans carry no
 * variants, quantity or stock — only one can be active at a time.
 */
export interface PlanOption {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface Step {
  id: number;
  title: string;
  category: string;
  expandedByDefault: boolean;
  products: Product[];
  plans?: PlanOption[];
}

export interface SummaryData {
  shipping: number;
  financingMonths: number;
  guaranteeTitle: string;
  guaranteeDescription: string;
}

export interface ProductsData {
  steps: Step[];
  plan: PlanData;
  summary: SummaryData;
}

export interface SelectedVariant {
  productId: string;
  variantId: string;
  quantity: number;
}