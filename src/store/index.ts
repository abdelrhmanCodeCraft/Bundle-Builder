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


let lastPersisted = store.getState().bundle;

store.subscribe(() => {
  const { bundle } = store.getState();

  if (bundle !== lastPersisted) {
    lastPersisted = bundle;
    saveBundle(bundle);
  }
});
