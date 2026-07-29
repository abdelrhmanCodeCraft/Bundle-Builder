type OrderSummaryProps = {
  subtotal: number;
  compareSubtotal: number;
  shipping: number;
  savings: number;
};

const OrderSummary = ({
  subtotal,
  compareSubtotal,
  shipping,
  savings,
}: OrderSummaryProps) => {
  return (
    <div className="mt-6 border-t pt-4">

      {/* Shipping */}

      <div className="mb-4 flex items-center justify-between text-sm">
        <span>Fast Shipping</span>

        <div className="text-right">
          {shipping > 0 && (
            <p className="text-danger line-through">
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
        <span className="text-lg font-semibold">
          Total
        </span>

        <div className="text-right">
          <p className="text-danger line-through">
            ${compareSubtotal.toFixed(2)}
          </p>

          <p className="text-3xl font-bold text-primary">
            ${subtotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Savings */}

      <div className="mt-3 rounded bg-[#1DF0BB22] p-2 text-center text-xs font-medium text-[#0AA288]">
        Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
      </div>

      {/* Checkout */}

      <button
        className="
          mt-4
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
        className="
          mt-3
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