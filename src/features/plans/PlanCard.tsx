import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPlan } from "../../store/bundleSlice";

import type { PlanOption } from "../../types/product";

type PlanCardProps = {
  plan: PlanOption;
};

const PlanCard = ({ plan }: PlanCardProps) => {
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector(
    (state) => state.bundle.selectedPlanId === plan.id
  );

  return (
    /*
      Border and background are set inline because the unlayered
      `button { border: none; background: transparent }` reset in globals.css
      outranks Tailwind's layered utilities — the same reason the accordion's
      Next button and the variant chips do it this way.
    */
    <button
      type="button"
      onClick={() => dispatch(selectPlan({ planId: plan.id }))}
      aria-pressed={isSelected}
      style={{
        backgroundColor: "var(--color-bg)",
        border: isSelected
          ? "2px solid var(--color-primary)"
          : "2px solid transparent",
      }}
      className="
        flex
        grow
        basis-[220px]
        max-w-[420px]
        flex-col
        rounded-card
        p-[15px]
        text-left
        transition-all
      "
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[16px] text-text-heading">
          {plan.title}
        </h3>

        {/* Radio-style marker, to read as a single choice rather than a toggle */}
        <span
          aria-hidden="true"
          className="mt-[3px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full"
          style={{
            border: isSelected
              ? "2px solid var(--color-primary)"
              : "2px solid #CED6DE",
          }}
        >
          {isSelected && (
            <span
              className="h-[8px] w-[8px] rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          )}
        </span>
      </div>

      <p className="mt-1 text-[12px] leading-[130%] text-text-secondary">
        {plan.description}
      </p>

      <p className="mt-3 text-[16px] font-semibold text-primary">
        ${plan.price.toFixed(2)}
        <span className="text-[12px] font-normal text-text-secondary">
          /mo
        </span>
      </p>
    </button>
  );
};

export default PlanCard;
