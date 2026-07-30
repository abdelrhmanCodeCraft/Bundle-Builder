import type { BundleState } from "./bundleSlice";

const STORAGE_KEY = "bundle-builder:state";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Rebuilds a trusted BundleState from whatever is actually in storage.
 *
 * `preloadedState` replaces the slice's initial state outright instead of
 * merging with it, so a blob that's been hand-edited, truncated, or written by
 * an older build would otherwise leave `quantities` undefined and throw as
 * soon as a component indexes into it. Returning undefined for anything we
 * can't read lets the store fall back to the seeded defaults instead.
 */
const parseSavedState = (value: unknown): BundleState | undefined => {
  if (!isPlainObject(value) || !isPlainObject(value.quantities)) {
    return undefined;
  }

  // An empty `quantities` is legitimate — it's a system with everything removed.
  const quantities: BundleState["quantities"] = {};
  for (const [key, quantity] of Object.entries(value.quantities)) {
    if (typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0) {
      quantities[key] = quantity;
    }
  }

  // A missing/bad variant map is recoverable: cards fall back to their first variant.
  const activeVariants: BundleState["activeVariants"] = {};
  if (isPlainObject(value.activeVariants)) {
    for (const [productId, variantId] of Object.entries(value.activeVariants)) {
      if (typeof variantId === "string") {
        activeVariants[productId] = variantId;
      }
    }
  }

  return { activeVariants, quantities };
};

export const loadPersistedState = (): BundleState | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? parseSavedState(JSON.parse(raw)) : undefined;
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
