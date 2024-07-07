/* eslint-disable no-unused-vars */
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Swal from "sweetalert2";

function Cart() {
  const { setCartItemCount } = useCart(); // Get the setCartItemCount function from context
  const [allCartInfo, setAllCartInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_GET_CART_DATA, {
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllCartInfo(data);
        setCartItemCount(data.length); // Update cart item count in context
      })
      .catch((error) => {
        setError(error);
      });
  }, [setCartItemCount]);

  const handleQuantityChange = (event, id) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const incrementQuantity = (id, currentQuantity) => {
    // const newQuantity = currentQuantity + 1;
    const newQuantity = Number(currentQuantity) + 1; // Convert to number explicitly
    // console.log(newQuantity);
    // console.log(typeof newQuantity);
    updateQuantity(id, newQuantity);
  };

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      // console.log(typeof newQuantity);
      updateQuantity(id, newQuantity);
    }
  };

  // Function to calculate total amount
  const calculateTotal = () => {
    return allCartInfo
      .reduce((total, item) => {
        return total + item.productprice * item.quantity;
      }, 0)
      .toFixed(2); // Ensure total is formatted to two decimal places
  };

  const updateQuantity = (id, newQuantity) => {
    // console.log(
    //   `Updating quantity for id: ${id} to new quantity: ${newQuantity}`
    // );

    fetch(import.meta.env.VITE_REACT_APP_UPDATE_CART_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, quantity: newQuantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update quantity");
        }
        return response.json();
      })
      // eslint-disable-next-line no-unused-vars
      .then((data) => {
        setAllCartInfo((prevCartInfo) =>
          prevCartInfo.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
        // console.log("Received cart data:", data); // Example usage
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleDeleteItem = (id) => {
    fetch(`${import.meta.env.VITE_REACT_APP_UPDATE_CART_DATA}?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item from cart");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // alert("Product removed from cart!");
          Swal.fire({
            title: "Success!",
            text: "Product removed from cart!",
            icon: "info",
            confirmButtonColor: "#374151",
            confirmButtonText: "Close",
          });
        } else {
          alert("Error removing product from cart: " + data.message);
        }
        setAllCartInfo((prevCartInfo) => {
          const updatedCart = prevCartInfo.filter((item) => item.id !== id);
          setCartItemCount(updatedCart.length); // Update cart item count in context
          return updatedCart;
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    return (
      <div className="mt-12 font-medium flex justify-center tracking-wide">
        Error: {error.message}
      </div>
    );
  }

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
                            onClick={() =>
                              decrementQuantity(cartinfo.id, cartinfo.quantity)
                            }
                            type="button"
                            className="size-9 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            id="Quantity"
                            readOnly
                            min={1}
                            value={cartinfo.quantity}
                            onChange={(e) =>
                              handleQuantityChange(e, cartinfo.id)
                            }
                            className="h-8 w-9 rounded border border-gray-200 text-center pl-1"
                          />

                          <button
                            onClick={() =>
                              incrementQuantity(cartinfo.id, cartinfo.quantity)
                            }
                            type="button"
                            className="size-9 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteItem(cartinfo.id)}
                            className="text-gray-600 transition hover:text-red-600"
                          >
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
                      Total:{" "}
                      <span className="font-medium">${calculateTotal()}</span>
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
