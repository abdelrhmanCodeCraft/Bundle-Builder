import QuantityStepper from "../products/QuantityStepper";

type ReviewItemProps = {
  image: string;
  title: string;
  subtitle?: string;
  quantity: number;
  price: number;
  compareAtPrice?: number | null;
  showStepper?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

const ReviewItem = ({
  image,
  title,
  subtitle,
  quantity,
  price,
  compareAtPrice,
  showStepper = true,
  onIncrement,
  onDecrement,
}: ReviewItemProps) => {
  return (
    <div className="flex items-center gap-3 py-2">
      <img
        src={image}
        alt={title}
        className="h-11 w-11 rounded object-contain"
      />

      <div className="min-w-0 flex-1">
        <h4 className="text-[13px] font-medium text-text-primary">
          {title}
        </h4>

        {subtitle && (
          <p className="text-[12px] text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {showStepper && (
        <QuantityStepper
          value={quantity}
          onIncrement={onIncrement ?? (() => {})}
          onDecrement={onDecrement ?? (() => {})}
        />
      )}

      <div className="flex min-w-[70px] flex-col items-end">
        {compareAtPrice && (
          <span className="text-[12px] text-danger line-through">
            ${compareAtPrice.toFixed(2)}
          </span>
        )}

        <span className="text-[14px] font-semibold text-primary">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ReviewItem;