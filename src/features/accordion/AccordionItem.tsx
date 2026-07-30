import AccordionHeader from "./AccordionHeader";
import AccordionContent from "./AccordionContent";

import { useAppSelector } from "../../store/hooks";
import type { Step } from "../../types/product";

type AccordionItemProps = {
  step: Step;
  isOpen: boolean;
  isLast: boolean;
  nextStepTitle?: string;
  onToggle: () => void;
  onNext: () => void;
};

const AccordionItem = ({
  step,
  isOpen,
  isLast,
  nextStepTitle,
  onToggle,
  onNext,
}: AccordionItemProps) => {
  const selectedCount = useAppSelector((state) =>
    step.plans
      ? state.bundle.selectedPlanId
        ? 1
        : 0
      : step.products.filter((product) =>
          product.variants.some(
            (variant) =>
              (state.bundle.quantities[`${product.id}-${variant.id}`] ?? 0) > 0
          )
        ).length
  );

  return (
    <article
      className={`
        overflow-hidden
        rounded-card
        transition-all
        duration-300
        ${isOpen ? "bg-surface" : "bg-transparent"}
      `}
    >
      <AccordionHeader
        step={step}
        isOpen={isOpen}
        selectedCount={selectedCount}
        onToggle={onToggle}
      />

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${
            isOpen
              ? "max-h-[2000px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <AccordionContent step={step} />

        {!isLast && (
          <div className="px-[15px] pb-[15px] flex justify-center w-full">
            <button
              onClick={onNext}
              style={{
                border: "1px solid #4e2fd2",
                color: "#4e2fd2",
                backgroundColor: "transparent",
                fontWeight: 600,  
              }}
              className="
                w-full
                max-w-[260px]
                h-[39px]
                px-[24px]
                py-[5px]
                rounded-[7px]
                transition-opacity
                hover:opacity-90
                flex
                items-center
                justify-center
                font-semibold
              "
            >
              Next: {nextStepTitle}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default AccordionItem;