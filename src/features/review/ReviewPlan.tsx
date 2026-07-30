import type { ReactNode } from "react";

type ReviewPlanProps = {
  title: string;
  icon: ReactNode;
  name: string;
  highlightedText?: string;
  compareAtPrice?: number;
  price: number;
};

const ReviewPlan = ({
  title,
  icon,
  name,
  highlightedText,
  compareAtPrice,
  price,
}: ReviewPlanProps) => {
  const baseName = highlightedText
    ? name.replace(highlightedText, "").trim()
    : name;

  return (
    <section className="mt-4 border-t border-[#CED6DE] pt-4">
      <div className="flex items-start justify-between">
        {/* Left */}
        <div>
          <p className="text-[12px] text-text-secondary">
            {title}
          </p>

          <div className="mt-2 flex items-center gap-2">
            {icon}

            <div className="text-[14px] font-bold">

              <span>{baseName} </span>

              {highlightedText && (
                <span className="font-bold text-primary">
                  {highlightedText}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="text-right">
          {compareAtPrice !== undefined && (
            <p className="text-[14px] text-text-secondary line-through">
              ${compareAtPrice.toFixed(2)}/mo
            </p>
          )}

          <p className="font-medium text-primary">
            ${price.toFixed(2)}/mo
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewPlan;