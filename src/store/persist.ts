import type { BundleState } from "./bundleSlice";

const STORAGE_KEY = "bundle-builder:state";

export const loadPersistedState = (): BundleState | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BundleState) : undefined;
  } catch (error) {
    console.warn("Could not read saved system from localStorage:", error);
    return undefined;
  }
};

export const savePersistedState = (state: BundleState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // localStorage may be full or disabled (e.g. private browsing / a sandboxed iframe)
    console.warn("Could not save system to localStorage:", error);
  }
};
