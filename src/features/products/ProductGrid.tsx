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
        grid
        grid-cols-[repeat(auto-fit,minmax(140px,1fr))]
        gap-4
        xl:grid-cols-2
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