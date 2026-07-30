import productsData from "../data/products.json";

import type { RootState } from "./index";
import type { PlanOption, Product, Variant } from "../types/product";

const allPlans: PlanOption[] = productsData.steps.flatMap(
  (step) => step.plans ?? []
);

export const getSelectedPlan = (
  state: RootState
): PlanOption | null =>
  allPlans.find(
    (plan) => plan.id === state.bundle.selectedPlanId
  ) ?? null;

export interface SelectedReviewItem {
  id: string;
  category: string;
  product: Product;
  variant: Variant;
  quantity: number;
}

export const getSelectedProducts = (
  state: RootState
): SelectedReviewItem[] => {
  const items: SelectedReviewItem[] = [];

  for (const step of productsData.steps) {
    for (const product of step.products) {
      for (const variant of product.variants) {
        const quantity =
          state.bundle.quantities[
            `${product.id}-${variant.id}`
          ] ?? 0;

        if (quantity === 0) continue;

        items.push({
          id: `${product.id}-${variant.id}`,
          category: step.category,
          product,
          variant,
          quantity,
        });
      }
    }
  }

  return items;
};

export const getItemsByCategory = (
  state: RootState,
  category: string
) => {
  return getSelectedProducts(state).filter(
    (item) => item.category === category
  );
};

export const getSubtotal = (state: RootState) =>
  getSelectedProducts(state).reduce(
    (total, item) =>
      total + item.variant.price * item.quantity,
    0
  );

export const getCompareSubtotal = (
  state: RootState
) =>
  getSelectedProducts(state).reduce(
    (total, item) =>
      total +
      (item.variant.compareAtPrice ??
        item.variant.price) *
        item.quantity,
    0
  );

export const getSavings = (
  state: RootState
) =>
  getCompareSubtotal(state) -
  getSubtotal(state);