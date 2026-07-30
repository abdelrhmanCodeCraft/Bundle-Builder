import PlanCard from "./PlanCard";
import type { PlanOption } from "../../types/product";

type PlanGridProps = {
  plans: PlanOption[];
};

const PlanGrid = ({
  plans,
}: PlanGridProps) => {
  return (
    <div
      className="
        flex
        flex-wrap
        justify-center
        gap-4
      "
    >
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
        />
      ))}
    </div>
  );
};

export default PlanGrid;
