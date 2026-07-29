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
        grid-cols-1
        lg:grid-cols-2
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