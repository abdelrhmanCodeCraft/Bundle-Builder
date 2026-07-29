import ReviewItem from "./ReviewItem";

type Item = {
  id: string;
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

type ReviewSectionProps = {
  title: string;
  items: Item[];
  withDivider?: boolean;
};

const ReviewSection = ({
  title,
  items,
  withDivider,
}: ReviewSectionProps) => {
  if (!items.length) return null;

  return (
    <section
      className={`mt-5 ${
        withDivider ? "border-t border-[#CED6DE] pt-5" : ""
      }`}
    >
      <h3 className="mb-2 text-[11px] uppercase tracking-wide text-text-label">
        {title}
      </h3>

      <div className="space-y-2">
        {items.map((item) => (
          <ReviewItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;