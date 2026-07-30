import type { BundleState } from "./bundleSlice";


const STORAGE_KEY = "bundle-builder:v1";
const LEGACY_KEYS = ["bundle-builder:state"];


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


const parseBundle = (value: unknown): BundleState | undefined => {
  if (!isPlainObject(value) || !isPlainObject(value.quantities)) {
    return undefined;
  }

  const quantities: BundleState["quantities"] = {};
  for (const [key, quantity] of Object.entries(value.quantities)) {
    if (typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0) {
      quantities[key] = quantity;
    }
  }

  const activeVariants: BundleState["activeVariants"] = {};
  if (isPlainObject(value.activeVariants)) {
    for (const [productId, variantId] of Object.entries(value.activeVariants)) {
      if (typeof variantId === "string") {
        activeVariants[productId] = variantId;
      }
    }
  }

  const selectedPlanId =
    typeof value.selectedPlanId === "string" ? value.selectedPlanId : null;

  return { activeVariants, quantities, selectedPlanId };
};

export const loadBundle = (): BundleState | undefined => {
  if (!storage) return undefined;

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
