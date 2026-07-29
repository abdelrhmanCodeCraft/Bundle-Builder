import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  decreaseQuantity,
  increaseQuantity,
} from "../../store/bundleSlice";

import {
  getItemsByCategory,
  getSubtotal,
  getCompareSubtotal,
  getSavings,
} from "../../store/selectors";

import ReviewSection from "./ReviewSection";
import OrderSummary from "./OrderSummary";

const ReviewPanel = () => {
  const dispatch = useAppDispatch();

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
      />

      <ReviewSection
        title="Accessories"
        items={mapItems(accessories)}
      />

      <ReviewSection
        title="Plan"
        items={mapItems(plan, false)}
      />

      <OrderSummary
        subtotal={subtotal}
        compareSubtotal={compareSubtotal}
        savings={savings}
        shipping={5.99}
      />
    </aside>
  );
};

export default ReviewPanel;