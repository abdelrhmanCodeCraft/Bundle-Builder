import type { BundleState } from "./bundleSlice";

const STORAGE_KEY = "bundle-builder:state";

export const loadPersistedState = (): BundleState | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BundleState) : undefined;
  } catch {
    return undefined;
  }
};

export const savePersistedState = (state: BundleState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage may be full or disabled (e.g. private browsing) — nothing to do
  }
};
