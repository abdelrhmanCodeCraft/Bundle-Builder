type QuantityStepperProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /**
   * Tighter footprint for the product cards below the desktop breakpoint,
   * where the stepper shares a line with the price inside a narrow card.
   * Callers that leave it off keep the standard size at every width.
   */
  compact?: boolean;
};

const QuantityStepper = ({
  value,
  onIncrement,
  onDecrement,
  compact = false,
}: QuantityStepperProps) => {

  const isMinOrZero = value <= 1;

  const wrapperClasses = compact
    ? "flex h-[35px] items-center gap-1 rounded-[4px] px-[2px] py-[4px] desktop:w-[80px] desktop:justify-between desktop:gap-[10px] desktop:px-[6px]"
    : "flex h-[35px] w-[80px] items-center justify-between gap-[10px] rounded-[4px] px-[6px] py-[4px]";

  const buttonClasses = compact
    ? "h-[20px] w-[22px] desktop:w-[30px]"
    : "h-[20px] w-[30px]";

  return (
    <div className={wrapperClasses}>

      <button
        type="button"
        onClick={onDecrement}
        disabled={value === 0}
        className={`flex ${buttonClasses} items-center justify-center rounded-[4px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 fontWeight-medium`}
        style={
          
          isMinOrZero
            ? {
                border: "3px solid #E6EBF0",
                color: "#E6EBF0",
                backgroundColor: "transparent",
              }
            : {
                backgroundColor: "#F0F4F7",
                color: "#525963",
              }
        }
      >
        −
      </button>

     
      <span className="flex items-center justify-center text-sm font-medium text-[#525963]">
        {value}
      </span>

      
      <button
        type="button"
        onClick={onIncrement}
        className={`flex ${buttonClasses} items-center justify-center rounded-[4px] transition-colors`}
        style={{
          backgroundColor: "#F0F4F7",
          color: "#525963",
          
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;