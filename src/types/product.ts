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
  actionLink: string;
  variants: Variant[];
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
}

export interface SelectedVariant {
  productId: string;
  variantId: string;
  quantity: number;
}