import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_GET_PRODUCT_DATA)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">All Products</h1>
            </div>
          </div>

          <div className="flex mt-3">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {allProducts.map((allProducts) => (
                <Link to={`/shop/${allProducts.id}`} key={allProducts.id}>
                  <div className="group relative">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                      <img
                        src={`/products/${allProducts.product_image}`}
                        alt="Product Image"
                        className="w-full h-full object-cover object-center"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        {allProducts.productname}
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">
                        ${allProducts.productprice}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
