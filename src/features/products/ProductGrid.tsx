import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({
  products,
}: ProductGridProps) => {

  return (
    <div
      className="
        flex
        flex-wrap
        justify-center
        gap-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;