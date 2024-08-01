import { Link } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import { Plus } from "lucide-react";

function Products() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Products
        </h1>

        <Link
          to="/shop"
          className="rounded-lg bg-gray-800 text-center py-2 px-4 text-sm text-gray-100 font-light transition hover:bg-gray-700 mt-2 flex items-center gap-1"
        >
          <Plus size={17} /> Add Product
        </Link>
      </div>

      <ProductCard />
      {/* <Pagination /> */}
    </div>
  );
}

export default Products;
