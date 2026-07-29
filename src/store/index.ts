import { configureStore } from "@reduxjs/toolkit";
import bundleReducer from "./bundleSlice";
import { loadPersistedState } from "./persist";

const persistedBundle = loadPersistedState();

export const store = configureStore({
  reducer: {
    bundle: bundleReducer,
  },
  preloadedState: persistedBundle ? { bundle: persistedBundle } : undefined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;