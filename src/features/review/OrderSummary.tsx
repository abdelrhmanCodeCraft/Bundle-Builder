type OrderSummaryProps = {
  subtotal: number;
  compareSubtotal: number;
  shipping: number;
  savings: number;
  onSave: () => void;
};

const OrderSummary = ({
  subtotal,
  compareSubtotal,
  shipping,
  savings,
  onSave,
}: OrderSummaryProps) => {
  return (
    <div className="mt-6 border-t pt-4">

      {/* Shipping */}

      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <img
            src="/icons/Wyze Sense Keypad.svg"
            alt="Shipping"
            className="h-[41px] w-[41px] "
          />
          <span>Fast Shipping</span>
        </div>

        <div className="text-right">
          {shipping > 0 && (
            <p className="text-gray-500 line-through">
              ${shipping.toFixed(2)}
            </p>
          )}

          <p className="font-semibold text-primary">
            FREE
          </p>
        </div>
      </div>

      {/* Total */}

      <div className="flex items-end justify-between">
        <img
          src="/images/Shipping.png"
          alt="Shipping"
          className="h-[78px] w-[78px] sm:h-[131px] sm:w-[131px] xl:h-[78px] xl:w-[78px]"
        />

        <div>
          <p className="text-sm px-1 ml-auto  " style={{ width:"fit-content",  backgroundColor: "#4e2fd2", color: "white", borderRadius: "2px", fontSize: "12px" }}>
            as low as $19.19/mo
          </p>
          <span className="text-right flex gap-2 items-center ">
          <p className="text-gray-500 line-through">
            ${compareSubtotal.toFixed(2)}
          </p>

          <p className="text-2xl font-bold text-primary">
            ${subtotal.toFixed(2)}
          </p>
        </span>
        </div>
      </div>

      {/* Savings */}

      <div className="mt-3 rounded p-2 text-center text-xs font-medium text-[#0AA288]">
        Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
      </div>

      {/* Checkout */}

      <button
      style={{ backgroundColor: "#4e2fd2" }}
        className="
          mt-1
          h-12
          w-full
          rounded-md
          bg-primary
          font-medium
          text-white
          transition
          hover:opacity-90
        "
      >
        Checkout
      </button>

      <button
        onClick={onSave}
        className="
          mt-1
          w-full
          text-center
          text-sm
          italic
          text-text-secondary
          underline
        "
      >
        Save my system for later
      </button>
    </div>
  );
};

export default OrderSummary;