import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BundleState {
  /**
   * Currently selected variant for every product.
   *
   * Example:
   * {
   *   "wyze-cam-v4": "white",
   *   "wyze-cam-pan-v3": "black"
   * }
   */
  activeVariants: Record<string, string>;

  /**
   * Quantity of every variant.
   *
   * Key format:
   * `${productId}-${variantId}`
   *
   * Example:
   * {
   *   "wyze-cam-v4-white": 2,
   *   "wyze-cam-v4-black": 1
   * }
   */
  quantities: Record<string, number>;

  /**
   * The chosen subscription plan, or null when none is selected. A single id
   * rather than a map, since only one plan can be active at a time.
   */
  selectedPlanId: string | null;
}

const initialState: BundleState = {
  // Initial selected variant exactly like the design
  activeVariants: {
    "wyze-cam-v4": "white",
    "wyze-cam-pan-v3": "white",
    "wyze-cam-floodlight-v2": "white",
    "wyze-battery-cam-pro": "white",
  },

  // Initial quantities exactly like the design
  quantities: {
    "wyze-cam-v4-white": 1,
    "wyze-cam-pan-v3-white": 2,
    "entry-sensor-default": 1,
    "motion-sensor-default": 1,
    "wyze-solar-panel-default": 1,
  },

  // Initial plan exactly like the design
  selectedPlanId: "cam-unlimited",
};

const bundleSlice = createSlice({
  name: "bundle",

  initialState,

  reducers: {
    changeVariant: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
      }>
    ) => {
      state.activeVariants[action.payload.productId] =
        action.payload.variantId;
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
        stock?: number;
      }>
    ) => {
      const key = `${action.payload.productId}-${action.payload.variantId}`;

      const currentQuantity = state.quantities[key] ?? 0;

      if (
        action.payload.stock !== undefined &&
        currentQuantity >= action.payload.stock
      ) {
        return;
      }

      state.quantities[key] = currentQuantity + 1;
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
      }>
    ) => {
      const key = `${action.payload.productId}-${action.payload.variantId}`;

      const currentQuantity = state.quantities[key];

      if (!currentQuantity) return;

      if (currentQuantity === 1) {
        delete state.quantities[key];
        return;
      }

      state.quantities[key] = currentQuantity - 1;
    },

    selectPlan: (
      state,
      action: PayloadAction<{
        planId: string;
      }>
    ) => {
      state.selectedPlanId = action.payload.planId;
    },

    resetBundle: () => initialState,
  },
});

export const {
  changeVariant,
  increaseQuantity,
  decreaseQuantity,
  selectPlan,
  resetBundle,
} = bundleSlice.actions;

export default bundleSlice.reducer;