import { configureStore } from "@reduxjs/toolkit";
import bundleReducer from "./bundleSlice";
import { loadBundle, saveBundle } from "./storage";

const savedBundle = loadBundle();

export const store = configureStore({
  reducer: {
    bundle: bundleReducer,
  },
  preloadedState: savedBundle ? { bundle: savedBundle } : undefined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Persist on every change rather than only when the shopper clicks "Save my
 * system for later". The link stays meaningful (it confirms the save), but the
 * configuration survives a reload no matter how the shopper leaves the page.
 *
 * Immer gives us a new `bundle` reference only when the slice actually changed,
 * so this identity check keeps us from rewriting storage on unrelated updates.
 */
let lastPersisted = store.getState().bundle;

store.subscribe(() => {
  const { bundle } = store.getState();

  if (bundle !== lastPersisted) {
    lastPersisted = bundle;
    saveBundle(bundle);
  }
});
