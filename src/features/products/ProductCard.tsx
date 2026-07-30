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
        w-full
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
          flex-col
          items-center
          gap-2
          text-center
          xl:h-full
          xl:flex-row
          xl:items-center
          xl:gap-[13px]
          xl:text-left
        "
      >
        {/* Image (top on tablet/mobile, left on desktop) */}
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            xl:w-[110px]
            xl:shrink-0
            xl:justify-center
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
            className="h-[90px] w-full object-contain"
          />
        </div>

        {/* Details (bottom on tablet/mobile, right on desktop) */}
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            xl:min-w-0
            xl:flex-1
            xl:items-stretch
            xl:justify-center
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
            <div className="flex justify-center xl:justify-start">
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

          <div
            className="
              mt-1
              flex
              flex-col
              items-center
              gap-2
              xl:flex-row
              xl:items-center
              xl:justify-between
              xl:gap-0
            "
          >
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

            <div className="flex flex-col items-center xl:items-end xl:self-center xl:text-right">
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