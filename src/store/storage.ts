import type { BundleState } from "./bundleSlice";

/**
 * Versioned key. Anything written by an earlier build lives under a different
 * key, so a saved blob whose shape has since changed is ignored instead of
 * being fed back into a state it no longer fits.
 */
const STORAGE_KEY = "bundle-builder:v1";
const LEGACY_KEYS = ["bundle-builder:state"];

/**
 * localStorage throws rather than returning null in a few real situations —
 * a sandboxed iframe, a `file://` page, Safari's private mode, or a blocked
 * third-party context. Probing once up front means the rest of the module can
 * treat storage as plainly present or absent.
 */
const getStorage = (): Storage | null => {
  try {
    const probe = "__bundle_builder_probe__";
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
};

const storage = getStorage();

export const isStorageAvailable = () => storage !== null;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Rebuilds a state we can safely hand to the store.
 *
 * `preloadedState` replaces a slice's initial state outright rather than
 * merging into it, so a partial blob would leave `quantities` undefined and
 * throw as soon as a component indexed into it — which showed up as a blank
 * page. Anything unreadable returns undefined so the store keeps its defaults.
 */
const parseBundle = (value: unknown): BundleState | undefined => {
  if (!isPlainObject(value) || !isPlainObject(value.quantities)) {
    return undefined;
  }

  // An empty `quantities` is a real configuration — a system with nothing in it.
  const quantities: BundleState["quantities"] = {};
  for (const [key, quantity] of Object.entries(value.quantities)) {
    if (typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0) {
      quantities[key] = quantity;
    }
  }

  // A missing variant map is recoverable — cards fall back to their first variant.
  const activeVariants: BundleState["activeVariants"] = {};
  if (isPlainObject(value.activeVariants)) {
    for (const [productId, variantId] of Object.entries(value.activeVariants)) {
      if (typeof variantId === "string") {
        activeVariants[productId] = variantId;
      }
    }
  }

  // Anything that isn't a plan id reads as "no plan selected", which is valid.
  const selectedPlanId =
    typeof value.selectedPlanId === "string" ? value.selectedPlanId : null;

  return { activeVariants, quantities, selectedPlanId };
};

export const loadBundle = (): BundleState | undefined => {
  if (!storage) return undefined;

  // Drop blobs from older builds so they can't be misread as current state.
  LEGACY_KEYS.forEach((key) => storage.removeItem(key));

  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? parseBundle(JSON.parse(raw)) : undefined;
  } catch (error) {
    console.warn("[bundle-builder] could not read the saved system:", error);
    storage.removeItem(STORAGE_KEY);
    return undefined;
  }
};

/** Returns whether the write actually landed, so the UI can tell the truth. */
export const saveBundle = (bundle: BundleState): boolean => {
  if (!storage) return false;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(bundle));
    return true;
  } catch (error) {
    console.warn("[bundle-builder] could not save the system:", error);
    return false;
  }
};
