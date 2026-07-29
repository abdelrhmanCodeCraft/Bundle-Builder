import type { Step } from "../../types/product";

type AccordionHeaderProps = {
  step: Step;
  isOpen: boolean;
  selectedCount: number;
  isMobile: boolean;
  onToggle: () => void;
};

const AccordionHeader = ({
  step,
  isOpen,
  selectedCount,
  isMobile,
  onToggle,
}: AccordionHeaderProps) => {
  const showSelectedCount = isMobile || isOpen;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full text-left"
    >
      <div className="px-[15px] pt-[15px]">
        <div className="flex items-center justify-between">
          <span
            className="
              text-xs
              uppercase
              tracking-[0.6px]
              text-text-label
            "
          >
            Step {step.id} of 4
          </span>

          <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary sm:hidden">
            {selectedCount} selected
          </span>

          {isOpen && (
            <span className="hidden text-sm text-text-secondary sm:block">
              {selectedCount} selected
            </span>
          )}

          
        </div>
        </div>
      </div>

      <div className="mt-3 h-px w-full bg-[#1F1F1F]" />

      <div className="px-[15px] py-[15px] flex items-center justify-between">
        <h2 className="text-[18px] sm:text-[22px] text-text-primary">
          {step.title}
        </h2>
        <svg
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
      </div>

      {!isOpen && (
        <div className="h-px w-full bg-[#1F1F1F]" />
      )}
    </button>
  );
};

export default AccordionHeader;