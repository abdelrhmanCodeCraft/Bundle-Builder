import type { Product } from "../../types/product";
import ProductCard from "../products/ProductCard";

type AccordionContentProps = {
  products: Product[];
};

const AccordionContent = ({ products }: AccordionContentProps) => {
  return (
    <div className="px-[15px] pb-[15px]">
      <div className="grid grid-cols-2 gap-[13px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AccordionContent;