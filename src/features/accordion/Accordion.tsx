import { useState } from "react";

import productsData from "../../data/products.json";
import AccordionItem from "./AccordionItem";

const Accordion = () => {
  const [openStep, setOpenStep] = useState(
    productsData.steps.find((step) => step.expandedByDefault)?.id ?? 1
  );

  return (
    <div className="flex flex-col gap-[10px]">
      {productsData.steps.map((step, index) => (
        <AccordionItem
          key={step.id}
          step={step}
          isOpen={openStep === step.id}
          isLast={index === productsData.steps.length - 1}
          nextStepTitle={productsData.steps[index + 1]?.title}
          onToggle={() => setOpenStep(step.id)}
          onNext={() => {
            const nextStep = productsData.steps[index + 1];

            if (nextStep) {
              setOpenStep(nextStep.id);
            }
          }}
        />
      ))}
    </div>
  );
};

export default Accordion;