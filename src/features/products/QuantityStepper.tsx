type QuantityStepperProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const QuantityStepper = ({
  value,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) => {

  const isMinOrZero = value <= 1;

  return (
    <div 
      className="flex w-[80px] h-[35px] items-center justify-between rounded-[4px] py-[4px] px-[6px]"
      style={{ gap: "10px" }}
    >
     
      <button
        type="button"
        onClick={onDecrement}
        disabled={value === 0}
        className="flex h-[20px] w-[30px] items-center justify-center rounded-[4px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 fontWeight-medium"
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
        className="flex h-[20px] w-[30px] items-center justify-center rounded-[4px] transition-colors"
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