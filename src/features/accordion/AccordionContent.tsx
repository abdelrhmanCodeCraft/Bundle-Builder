import type { Step } from "../../types/product";
import ProductGrid from "../products/ProductGrid";
import PlanGrid from "../plans/PlanGrid";

type AccordionContentProps = {
  step: Step;
};

const AccordionContent = ({ step }: AccordionContentProps) => {
  return (
    <div className="px-[15px] pb-[15px]">
      {step.plans ? (
        <PlanGrid plans={step.plans} />
      ) : (
        <ProductGrid products={step.products} />
      )}
    </div>
  );
};

export default AccordionContent;
