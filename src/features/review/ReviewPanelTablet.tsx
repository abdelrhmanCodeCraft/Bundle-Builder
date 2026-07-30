import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  decreaseQuantity,
  increaseQuantity,
} from "../../store/bundleSlice";

import { saveBundle } from "../../store/storage";

import {
  getItemsByCategory,
  getSubtotal,
  getCompareSubtotal,
  getSavings,
  getSelectedPlan,
} from "../../store/selectors";

import productsData from "../../data/products.json";

import QuantityStepper from "../products/QuantityStepper";

const { summary } = productsData;



type Row = {
  id: string;
  image: string;
  title: string;
  quantity: number;
  lineTotal: number;
  lineCompareAt: number | null;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Divider = () => <div className="h-px w-full bg-[#CED6DE]" />;

const ReviewRow = ({ row }: { row: Row }) => (
  <div className="flex items-center gap-3 py-[10px]">
    <img
      src={row.image}
      alt={row.title}
      className="h-9 w-9 shrink-0 object-contain"
    />

    <h4 className="min-w-0 flex-1 text-[14px] font-medium text-text-primary">
      {row.title}
    </h4>

    <QuantityStepper
      value={row.quantity}
      onIncrement={row.onIncrement}
      onDecrement={row.onDecrement}
    />

    <div className="flex shrink-0 items-baseline justify-end gap-2">
      {row.lineCompareAt !== null && (
        <span className="text-[13px] text-text-secondary line-through">
          ${row.lineCompareAt.toFixed(2)}
        </span>
      )}

      <span className="text-[14px] font-semibold text-primary">
        ${row.lineTotal.toFixed(2)}
      </span>
    </div>
  </div>
);

const RowGroup = ({ title, rows }: { title: string; rows: Row[] }) => {
  if (!rows.length) return null;

  return (
    <section className="mt-4 pt-4">
      <Divider />

      <h3 className="mb-1 mt-4 text-[11px] uppercase tracking-wide text-text-label">
        {title}
      </h3>

      {rows.map((row) => (
        <ReviewRow key={row.id} row={row} />
      ))}
    </section>
  );
};

const ReviewPanelTablet = () => {
  const dispatch = useAppDispatch();

  const bundleState = useAppSelector((state) => state.bundle);

  const cameras = useAppSelector((state) => getItemsByCategory(state, "cameras"));
  const sensors = useAppSelector((state) => getItemsByCategory(state, "sensors"));
  const accessories = useAppSelector((state) =>
    getItemsByCategory(state, "accessories")
  );

  const subtotal = useAppSelector(getSubtotal);
  const compareSubtotal = useAppSelector(getCompareSubtotal);
  const savings = useAppSelector(getSavings);

  const plan = useAppSelector(getSelectedPlan);

  const [saveResult, setSaveResult] = useState<"idle" | "saved" | "failed">(
    "idle"
  );

  useEffect(() => {
    if (saveResult === "idle") return;

    const timer = setTimeout(() => setSaveResult("idle"), 2500);
    return () => clearTimeout(timer);
  }, [saveResult]);

  const saveLabel = {
    idle: "Save my system for later",
    saved: "Saved for later!",
    failed: "Couldn't save — storage blocked",
  }[saveResult];

  const toRows = (items: typeof cameras): Row[] =>
    items.map((item) => ({
      id: item.id,
      image: item.variant.image,
      title: item.product.title,
      quantity: item.quantity,
      lineTotal: item.variant.price * item.quantity,
      lineCompareAt:
        item.variant.compareAtPrice !== null
          ? item.variant.compareAtPrice * item.quantity
          : null,

      onIncrement: () =>
        dispatch(
          increaseQuantity({
            productId: item.product.id,
            variantId: item.variant.id,
            stock: item.variant.stock,
          })
        ),

      onDecrement: () =>
        dispatch(
          decreaseQuantity({
            productId: item.product.id,
            variantId: item.variant.id,
          })
        ),
    }));

  const planName =
    plan && plan.highlightedText
      ? plan.title.replace(plan.highlightedText, "").trim()
      : plan?.title;

  return (
    <div className="p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h2 className="text-[22px] font-semibold text-text-heading">
            Your security system
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          <RowGroup title="Cameras" rows={toRows(cameras)} />
          <RowGroup title="Sensors" rows={toRows(sensors)} />
          <RowGroup title="Accessories" rows={toRows(accessories)} />

          {plan && (
          <section className="mt-4 pt-4">
            <Divider />

            <h3 className="mb-1 mt-4 text-[11px] uppercase tracking-wide text-text-label">
              Plan
            </h3>

            <div className="flex items-center gap-3 py-[10px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-primary"
                aria-hidden="true"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              </svg>

              <span className="min-w-0 flex-1 text-[15px] font-bold text-text-heading">
                {planName}{" "}
                <span className="text-primary">{plan.highlightedText}</span>
              </span>

              <div className="flex shrink-0 items-baseline justify-end gap-2">
                {plan.compareAtPrice !== undefined && (
                  <span className="text-[13px] text-text-secondary line-through">
                    ${plan.compareAtPrice.toFixed(2)}/mo
                  </span>
                )}

                <span className="text-[14px] font-semibold text-primary">
                  ${plan.price.toFixed(2)}/mo
                </span>
              </div>
            </div>
          </section>
          )}

          <section className="mt-4 pt-4">
            <Divider />

            <div className="mt-4 flex items-center gap-3 py-[10px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-selected-border"
                aria-hidden="true"
              >
                <path d="M14 18V6a1 1 0 0 0-1-1H2v13h12z" />
                <path d="M14 9h4l4 4v5h-8" />
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
              </svg>

              <span className="min-w-0 flex-1 text-[15px] font-medium text-text-primary">
                Fast Shipping
              </span>

              <div className="flex shrink-0 items-baseline justify-end gap-2">
                <span className="text-[13px] text-text-secondary line-through">
                  ${summary.shipping.toFixed(2)}
                </span>

                <span className="text-[14px] font-semibold text-primary">
                  FREE
                </span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <div className="flex items-start gap-4">
            <img
              src="/images/Shipping.png"
              alt="100% satisfaction guarantee"
              className="h-[100px] w-[100px] shrink-0"
            />

            <div>
              <h3 className="text-[16px] font-bold text-text-heading">
                {summary.guaranteeTitle}
              </h3>

              <p className="mt-2 text-[14px] leading-[150%] text-text-secondary">
                {summary.guaranteeDescription}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-[4px] bg-primary px-3 py-[6px] text-[13px] font-medium text-white">
              as low as ${summary.financingPerMonth.toFixed(2)}/mo
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-[16px] text-text-secondary line-through">
                ${compareSubtotal.toFixed(2)}
              </span>

              <span className="text-[26px] font-bold text-primary">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="mt-3 text-center text-[13px] font-medium text-[#0AA288]">
            Congrats! You're saving ${savings.toFixed(2)} on your security
            bundle!
          </p>

          <button
            style={{ backgroundColor: "var(--color-primary)" }}
            className="
              mt-4
              h-12
              w-full
              rounded-md
              font-medium
              text-white
              transition
              hover:opacity-90
            "
          >
            Checkout
          </button>

          <button
            onClick={() =>
              setSaveResult(saveBundle(bundleState) ? "saved" : "failed")
            }
            className="
              mt-3
              w-full
              text-center
              text-sm
              italic
              text-text-secondary
              underline
            "
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPanelTablet;
