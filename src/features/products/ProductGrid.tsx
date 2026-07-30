import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({
  products,
}: ProductGridProps) => {
  /*
    Flex rather than grid below the desktop breakpoint: a grid drops the
    leftover cards of a wrapped row into its first columns, so a partial row
    sits against the left edge. Flex lets `justify-center` centre it.
  */
  return (
    <div
      className="
        flex
        flex-wrap
        justify-center
        gap-4
        desktop:grid
        desktop:grid-cols-2
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