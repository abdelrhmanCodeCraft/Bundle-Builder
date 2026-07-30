import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({
  products,
}: ProductGridProps) => {
  /*
    Flex rather than grid at every width: a grid drops the leftover cards of a
    wrapped row into its first columns, so a partial row sits against the left
    edge with the empty tracks trailing it. Flex lets `justify-center` centre
    it. The cards decide how many fit per row via their flex-basis.
  */
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