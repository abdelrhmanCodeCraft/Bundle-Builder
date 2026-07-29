import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeVariant,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/bundleSlice";

import VariantSelector from "./VariantSelector";
import QuantityStepper from "./QuantityStepper";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const activeVariantId = useAppSelector(
    (state) => state.bundle.activeVariants[product.id]
  );

  const activeVariant =
    product.variants.find(
      (variant) => variant.id === activeVariantId
    ) ?? product.variants[0];

  const quantity = useAppSelector(
    (state) =>
      state.bundle.quantities[
        `${product.id}-${activeVariant.id}`
      ] ?? 0
  );

  const isSelected = quantity > 0;

  return (
    <article
      className={`
        rounded-card
        border-2
        p-[11px]
        transition-all
        ${
          isSelected
            ? "border-primary bg-white"
            : "border-transparent bg-white"
        }
      `}
    >
      <div className="flex h-full items-center gap-[13px]">
        {/* Left */}
        <div className="flex w-[110px] shrink-0 flex-col items-center justify-center">
          {product.badge && (
            <span className="mb-2 w-fit rounded-full bg-primary px-2 py-1 text-[11px] text-white">
              {product.badge.text}
            </span>
          )}

          <img
            src={activeVariant.image}
            alt={product.title}
            className="h-[90px] w-full object-contain"
          />
        </div>

        {/* Right */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="text-[16px] text-text-heading">
            {product.title}
          </h3>

          <p className="mt-1 text-[12px] leading-[130%] text-text-secondary">
            {product.description}
            <a
              href={product.learnMore}
              className=" text-[14px] text-primary hover:underline"
              style={{ color: "#4e2fd2", textDecoration: "underline" }}
            >
              Learn More
            </a>
          </p>

          {product.variants.length > 1 && (
            <div className="">
              <VariantSelector
                variants={product.variants}
                selectedVariantId={activeVariant.id}
                onChange={(variantId) =>
                  dispatch(
                    changeVariant({
                      productId: product.id,
                      variantId,
                    })
                  )
                }
              />
            </div>
          )}

          <div className="mt-1 flex items-center justify-between">
            <QuantityStepper
              value={quantity}
              onIncrement={() =>
                dispatch(
                  increaseQuantity({
                    productId: product.id,
                    variantId: activeVariant.id,
                    stock: activeVariant.stock,
                  })
                )
              }
              onDecrement={() =>
                dispatch(
                  decreaseQuantity({
                    productId: product.id,
                    variantId: activeVariant.id,
                  })
                )
              }
            />

            <div className="flex flex-col items-end self-center text-right">
              {activeVariant.compareAtPrice && (
                <span className="text-[16px] font-normal leading-none tracking-[0.6px] text-danger line-through">
                  ${activeVariant.compareAtPrice.toFixed(2)}
                </span>
              )}

              <span className="mt-1 text-[16px] font-normal leading-none tracking-[0.6px] text-text-primary">
                ${activeVariant.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;