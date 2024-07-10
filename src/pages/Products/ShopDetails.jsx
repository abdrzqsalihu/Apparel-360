import { ChevronRight, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Swal from "sweetalert2";

function ShopDetails() {
  const { id } = useParams();
  const [ProductDetail, setProductDetail] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const { setCartItemCount } = useCart(); // Get the setCartItemCount function from context

  useEffect(() => {
    // Fetch product details from API endpoint
    fetch(`${import.meta.env.VITE_REACT_APP_GET_PRODUCT_DATA}?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductDetail(data[0]);
        } else {
          setProductDetail(null);
        }
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

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

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const addToCart = () => {
    if (!size) {
      // alert("Please select a size.");
      Swal.fire({
        title: "Oops...",
        text: "Please select a size.",
        icon: "warning",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
      return;
    }

    const payload = {
      id: ProductDetail.id,
      productname: ProductDetail.productname,
      productprice: ProductDetail.productprice,
      productimage: ProductDetail.product_image,
      quantity: quantity,
      size: size,
    };

    fetch(import.meta.env.VITE_REACT_APP_ADD_TO_CART_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include", // This is important to include cookies
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // alert("Product added to cart!");
          Swal.fire({
            title: "Success!",
            text: "Product added to cart!",
            icon: "success",
            confirmButtonColor: "#374151",
            confirmButtonText: "Close",
          });
          console.log(data);
          setCartItemCount(data.cartItemCount);
        } else {
          alert("Error adding product to cart: " + data.message);
          console.log(data.message);
        }
      })
      .catch((error) => {
        alert("Error adding product to cart: " + error.message);
        console.log(error.message);
      });
  };

  return (
    <div>
      <section className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
        {error && <div>{error}</div>}
        {ProductDetail ? (
          <>
            <div className="flex">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1 text-sm text-gray-600">
                  <li>
                    <Link
                      to="/"
                      className="block transition hover:text-gray-700"
                    >
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
                      {ProductDetail.productname}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="flex flex-col lg:flex-row mt-8">
              <div className="flex-initial w-full lg:w-[50%]">
                <img
                  src={`/products/${ProductDetail.product_image}`}
                  className="w-full lg:w-[80%] h-full rounded-md"
                  alt={ProductDetail.productname}
                />
              </div>
              <div className="flex-initial">
                <div className="mt-6 ml-0 lg:-ml-20">
                  <h1 className="font-medium text-2xl text-gray-800">
                    {ProductDetail.productname}
                  </h1>
                  <p className="font-light text-[1rem] mt-4 text-gray-600">
                    ${ProductDetail.productprice}
                  </p>

                  <div className="mt-6 flex items-center gap-6">
                    <label className="block text-sm font-medium text-gray-900">
                      Size:
                    </label>

                    <select
                      name="size"
                      className="mt-1.5 w-[50%] md:w-44 rounded-md border p-1 border-gray-200 text-gray-700 sm:text-sm"
                      value={size}
                      onChange={handleSizeChange}
                    >
                      <option value="" disabled>
                        Select a size
                      </option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  <div className="mt-10 flex items-center gap-x-5">
                    <label
                      htmlFor="Quantity"
                      className="font-medium text-[12px]"
                    >
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
                    <button
                      onClick={addToCart}
                      className="bg-black hover:opacity-90 text-white p-3 w-full shadow-sm rounded-sm"
                    >
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
                {ProductDetail.product_desc}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center font-medium">
            Loading...
          </div>
        )}
      </section>
    </div>
  );
}

export default ShopDetails;
