import { Trash2 } from "lucide-react";
import { useState } from "react";
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
                  <li className="w-[100%] flex flex-wrap items-center gap-4">
                    <div className="flex flex-row items-center justify-between gap-4 flex-grow">
                      <div className="flex flex-row items-center">
                        <img
                          src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                          alt=""
                          className="hidden md:block w-16 h-16 rounded object-cover"
                        />

                        <div className="flex flex-col">
                          <h3 className="text-sm text-gray-900 font-medium line-clamp-1">
                            Basic Tee 6-Pack
                          </h3>
                          <dl className="mt-0.5 space-y-px text-[11px] text-gray-600">
                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline ml-2">S</dd>
                            </div>
                            <div>
                              <dt className="inline">Price:</dt>
                              <dd className="inline ml-2">$200</dd>
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
                          value={quantity}
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
