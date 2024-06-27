import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const incrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const [allCartInfo, setAllCartInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "http://localhost/phenomenal/react_php_applications/apparel-360/src/server/api/get_cart_details.php",
      {
        credentials: "include", // Include credentials (cookies) in the request
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllCartInfo(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div className="mt-12 font-medium flex justify-center tracking-wide">
        Error: {error.message}
      </div>
    );
  }

  // console.log("allCartInfo:", allCartInfo);
  return (
    <>
      <section className="mt-10">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-10">
              <ul className="flex flex-col lg:flex-row">
                <div className="flex flex-1 flex-col items-center justify-center space-y-8">
                  {allCartInfo.map((cartinfo) => (
                    <li
                      key={cartinfo.id}
                      className="w-[100%] flex flex-wrap items-center gap-4"
                    >
                      <div className="flex flex-row items-center justify-between gap-4 flex-grow">
                        <div className="flex flex-row items-center">
                          <img
                            src={`/products/${cartinfo.productimage}`}
                            alt={cartinfo.productimage}
                            className="hidden md:block w-16 h-16 rounded object-cover mr-4"
                          />

                          <div className="flex flex-col w-full lg:w-60">
                            <h3 className="text-sm text-gray-900 font-medium line-clamp-1">
                              {cartinfo.productname}
                            </h3>
                            <dl className="mt-0.5 space-y-px text-[11px] text-gray-600">
                              <div>
                                <dt className="inline">Size:</dt>
                                <dd className="inline ml-2">{cartinfo.size}</dd>
                              </div>
                              <div>
                                <dt className="inline">Price:</dt>
                                <dd className="inline ml-2">
                                  ${cartinfo.productprice}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={decrementQuantity}
                            type="button"
                            className="size-9 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            id="Quantity"
                            min={1}
                            value={cartinfo.quantity}
                            onChange={handleQuantityChange}
                            className="h-8 w-9 rounded border border-gray-200 text-center pl-1"
                          />

                          <button
                            onClick={incrementQuantity}
                            type="button"
                            className="size-9 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 transition hover:text-red-600">
                            <span className="sr-only">Remove item</span>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>

                <div className="flex bg-gray-100 p-5 py-6 ml-0 lg:ml-10 mt-10 lg:mt-0 h-[15rem] w-full lg:w-[30%] rounded-md">
                  <div className="flex flex-col w-[100%]">
                    <h1 className="text-[18px] font-semibold my-1 tracking-wider">
                      Cart Total
                    </h1>
                    <p className="my-2 text-[15px] mb-6 tracking-tight">
                      Total: <span className="font-medium">$300</span>
                    </p>
                    <div className="w-full">
                      <Link
                        to="#"
                        className="block rounded bg-gray-700 text-center py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Proceed to Checkout
                      </Link>
                      <p className="text-sm text-center mt-3 tracking-wider font-medium">
                        OR
                      </p>
                      <Link
                        to="/shop"
                        className="block text-center py-3 text-sm text-gray-800 underline transition hover:opacity-70 font-semibold"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
