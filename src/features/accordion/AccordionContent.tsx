import type { Product } from "../../types/product";
import ProductGrid from "../products/ProductGrid";

type AccordionContentProps = {
  products: Product[];
};

const AccordionContent = ({ products }: AccordionContentProps) => {
  return (
    <div className="px-[15px] pb-[15px]">
      <ProductGrid products={products} />
    </div>
  );
};

export default AccordionContent;