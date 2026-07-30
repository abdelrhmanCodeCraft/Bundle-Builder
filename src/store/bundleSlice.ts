import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BundleState {

  activeVariants: Record<string, string>;


  quantities: Record<string, number>;


  selectedPlanId: string | null;
}

const initialState: BundleState = {
  activeVariants: {
    "wyze-cam-v4": "white",
    "wyze-cam-pan-v3": "white",
    "wyze-cam-floodlight-v2": "white",
    "wyze-battery-cam-pro": "white",
  },

  quantities: {
    "wyze-cam-v4-white": 1,
    "wyze-cam-pan-v3-white": 2,
    "entry-sensor-default": 1,
    "motion-sensor-default": 1,
    "wyze-solar-panel-default": 1,
  },

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