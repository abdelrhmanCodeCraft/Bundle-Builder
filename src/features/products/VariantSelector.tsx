import type { Variant } from "../../types/product";

type VariantSelectorProps = {
  variants: Variant[];
  selectedVariantId: string;
  onChange: (variantId: string) => void;
};

const VariantSelector = ({
  variants,
  selectedVariantId,
  onChange,
}: VariantSelectorProps) => {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {variants.map((variant) => {
        const isActive = variant.id === selectedVariantId;

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onChange(variant.id)}
            style={{
              backgroundColor: isActive ? "#1df0bb0c" : "transparent",
              border: isActive ? "1px solid #0AA288" : "1px solid #CCCCCC",
              borderRadius: "3px",
            }}
            className="flex items-center gap-1 px-1 py-1 transition-all mb-2"
          >
            <img
              src={variant.image}
              alt={variant.label}
              className="h-5 w-5 object-contain"
            />

            <span className="text-xs font-medium">
              {variant.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default VariantSelector;