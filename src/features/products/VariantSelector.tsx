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
    <div className="mt-3 flex flex-wrap gap-1 desktop:gap-2">
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
              className="h-4 w-4 object-contain desktop:h-5 desktop:w-5"
            />

            <span className="text-[11px] font-medium desktop:text-xs">
              {variant.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default VariantSelector;