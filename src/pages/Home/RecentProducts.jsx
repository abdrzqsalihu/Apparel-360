import { useState, useEffect } from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function RecentProducts() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://veepals.com/test/userserver/server/api/products.php?limit=4`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecentProducts(data);
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
              <h1 className="font-medium">Featured Products</h1>
            </div>
            <div>
              <Link to="/shop" className="flex items-center gap-x-2">
                <span>See All</span> <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="flex mt-3">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {recentProducts.map((recentProducts) => (
                <Link to={`/shop/${recentProducts.id}`} key={recentProducts.id}>
                  <div className="group relative">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                      <img
                        src={`/products/${recentProducts.product_image}`}
                        alt="Product Image"
                        className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        {recentProducts.productname}
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">
                        ₦{recentProducts.productprice}.00
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

export default RecentProducts;
