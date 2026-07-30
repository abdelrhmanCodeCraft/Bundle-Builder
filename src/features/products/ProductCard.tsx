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
        grow
        basis-[200px]
        min-[450px]:max-[1679px]:max-w-[280px]
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
      <div
        className="
          flex
          h-full
          flex-col
          gap-2
          text-left
          desktop:flex-row
          desktop:items-center
          desktop:gap-[13px]
        "
      >
        {/* Image (top on tablet/mobile, left on desktop) */}
        <div
          className="
            flex
            w-full
            flex-col
            items-start
            desktop:w-[110px]
            desktop:shrink-0
            desktop:items-center
            desktop:justify-center
          "
        >
          {product.badge && (
            <span className="mb-2 w-fit rounded-full bg-primary px-2 py-1 text-[11px] text-white">
              {product.badge.text}
            </span>
          )}

          <img
            src={activeVariant.image}
            alt={product.title}
            className="h-[110px] w-full object-contain desktop:h-[90px]"
          />
        </div>

        {/* Details (bottom on tablet/mobile, right on desktop) */}
        <div
          className="
            flex
            w-full
            flex-1
            flex-col
            desktop:min-w-0
            desktop:justify-center
          "
        >
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
            <div className="flex justify-start">
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

          {/*
            Pinned to the bottom of the card so the stepper and price sit on a
            shared line across the row, however tall the copy above them runs.
            Wraps only if a card gets narrow enough that both can't fit.
          */}
          <div
            className="
              mt-auto
              flex
              flex-wrap
              items-center
              justify-between
              gap-2
              pt-2
              desktop:mt-1
              desktop:flex-nowrap
              desktop:gap-0
              desktop:pt-0
            "
          >
            <QuantityStepper
              compact
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

            <div
              className="
                flex
                items-baseline
                gap-2
                desktop:flex-col
                desktop:items-end
                desktop:gap-0
                desktop:self-center
                desktop:text-right
              "
            >
              {activeVariant.compareAtPrice && (
                <span className="text-[13px] font-normal leading-none tracking-[0.6px] text-danger line-through desktop:text-[16px]">
                  ${activeVariant.compareAtPrice.toFixed(2)}
                </span>
              )}

              <span className="text-[13px] font-normal leading-none tracking-[0.6px] text-text-primary desktop:mt-1 desktop:text-[16px]">
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