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

import ReviewSection from "./ReviewSection";
import OrderSummary from "./OrderSummary";
import ReviewPlan from "./ReviewPlan";

const ReviewPanel = () => {
  const dispatch = useAppDispatch();

  const bundleState = useAppSelector((state) => state.bundle);

  const cameras = useAppSelector((state) =>
    getItemsByCategory(state, "cameras")
  );

  const sensors = useAppSelector((state) =>
    getItemsByCategory(state, "sensors")
  );

  const accessories = useAppSelector((state) =>
    getItemsByCategory(state, "accessories")
  );

  const plan = useAppSelector((state) =>
    getItemsByCategory(state, "plan")
  );

  const subtotal = useAppSelector(getSubtotal);

  const compareSubtotal =
    useAppSelector(getCompareSubtotal);

  const savings = useAppSelector(getSavings);

  const selectedPlan = useAppSelector(getSelectedPlan);

  const mapItems = (
    items: typeof cameras,
    withStepper = true
  ) =>
    items.map((item) => ({
      id: item.id,
      image: item.variant.image,
      title: item.product.title,
      subtitle:
        item.variant.id !== "default"
          ? item.variant.label
          : undefined,
      quantity: item.quantity,
      price: item.variant.price,
      compareAtPrice:
        item.variant.compareAtPrice,
      showStepper: withStepper,

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

  return (
    <aside
      className="
        rounded-card
        bg-surface
        p-5
      "
    >
      <h2 className="text-[22px] font-semibold text-text-heading">
        Your security system
      </h2>

      <p className="mt-1 text-sm text-text-secondary">
        Review your personalized protection
        system designed to keep what matters
        most safe.
      </p>

      <ReviewSection
        title="Cameras"
        items={mapItems(cameras)}
      />

      <ReviewSection
        title="Sensors"
        items={mapItems(sensors)}
        withDivider
      />

      <ReviewSection
        title="Accessories"
        items={mapItems(accessories)}
        withDivider
      />

      {selectedPlan && (
        <ReviewPlan
          title="Plan"
          icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="M12 22V2" />
            </svg>
          }
          name={selectedPlan.title}
          highlightedText={selectedPlan.highlightedText}
          compareAtPrice={selectedPlan.compareAtPrice}
          price={selectedPlan.price}
        />
      )}

      <ReviewSection
        title="Plan"
        items={mapItems(plan, false)}
      />

      <OrderSummary
        subtotal={subtotal}
        compareSubtotal={compareSubtotal}
        savings={savings}
        shipping={productsData.summary.shipping}
        financingPerMonth={productsData.summary.financingPerMonth}
        onSave={() => saveBundle(bundleState)}
      />
    </aside>
  );
};

export default ReviewPanel;