import { ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ShopDetails() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const incrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  return (
    <div>
      <section className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm text-gray-600">
              <li>
                <Link to="/" className="block transition hover:text-gray-700">
                  <span className="sr-only"> Home </span>

                  <Home size={15} />
                </Link>
              </li>

              <li className="rtl:rotate-180">
                <ChevronRight size={15} />
              </li>

              <li>
                <Link
                  to="/shop"
                  className="block transition hover:text-gray-700"
                >
                  Shop
                </Link>
              </li>

              <li className="rtl:rotate-180">
                <ChevronRight size={15} />
              </li>

              <li>
                <span className="block transition hover:text-gray-700">
                  {" "}
                  Plain Tee{" "}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row mt-8">
          <div className="flex-initial w-full lg:w-[50%]">
            <img
              src="/products/product_1.png"
              className="w-full lg:w-[80%] h-full rounded-md"
              alt=""
            />
          </div>
          <div className="flex-initial">
            <div className="mt-6 ml-0 lg:-ml-20">
              <h1 className="font-medium text-2xl text-gray-800">
                Product Name
              </h1>
              <p className="font-light text-[1rem] mt-4 text-gray-600">
                $20.00
              </p>

              <div className="mt-6 flex items-center gap-x-5">
                <label className="block text-sm font-medium text-gray-900">
                  Size:
                </label>

                <select
                  name="size"
                  className="mt-1.5 w-[50%] md:w-full rounded-md border p-1 border-gray-200 text-gray-700 sm:text-sm"
                >
                  <option selected disabled></option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>

              <div className="mt-10 flex items-center gap-x-5">
                <label htmlFor="Quantity" className="font-medium text-[12px]">
                  Quantity:
                </label>

                <div className="flex items-center gap-1">
                  <button
                    onClick={decrementQuantity}
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    id="Quantity"
                    min={1}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="h-10 w-16 rounded border border-gray-200 text-center"
                  />

                  <button
                    onClick={incrementQuantity}
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-12">
                <button className="bg-black hover:opacity-90 text-white p-3 w-full shadow-sm rounded-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6">
              <p className="shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-gray-900 tracking-wider">
                Product Description
              </p>
            </nav>
          </div>
          <p className="mt-7 text-gray-800/90 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            quasi ipsa rem dolores deleniti est nam debitis hic ex eum in, fuga
            aut placeat tempore voluptatum sapiente suscipit quibusdam
            voluptate.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ShopDetails;
