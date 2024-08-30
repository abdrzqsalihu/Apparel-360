import {
  ArrowLeftCircleIcon,
  Calendar,
  CheckCircle2,
  Loader2Icon,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function OrderDetails() {
  const { order_id } = useParams();

  const [ProductDetail, setProductDetail] = useState([]);
  const [DeliveryDetail, setDeliveryDetail] = useState(null);
  const [error, setError] = useState(null);

  //   Fetch all user order info
  useEffect(() => {
    // Fetch product details from API endpoint
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_ADMIN_GET_USER_ORDER_DETAILS_DATA
      }?order_id=${order_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "order_details",
        }),
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductDetail(data);
        } else {
          setProductDetail([]);
        }
        // console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [order_id]);

  // Function to calculate total amount
  const calculateTotal = () => {
    return ProductDetail.reduce((total, item) => {
      return total + item.productprice * item.quantity;
    }, 0).toFixed(2); // Ensure total is formatted to two decimal places
  };

  // Fetch delivery details from API endpoint
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_ADMIN_GET_USER_ORDER_DETAILS_DATA
      }?delivery_id=${order_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delivery_info",
        }),
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDeliveryDetail(data[0]);
        } else {
          setDeliveryDetail(null);
        }
        // console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [order_id]);

  const dateInputRef = useRef(null);

  const handleOrderUpdate = (status) => {
    const deliveryDate = dateInputRef.current.value;

    if (!deliveryDate && status === "confirmed") {
      Swal.fire({
        title: "Delivery date not selected",
        text: "Please select a delivery date",
        icon: "warning",
        confirmButtonText: "Close",
        confirmButtonColor: "#374151",
      });
      return;
    }

    Swal.fire({
      title: status === "cancelled" ? "Are you sure?" : "Confirm Order",
      text:
        status === "cancelled"
          ? "Do you really want to cancel your order?"
          : "Do you want to confirm this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText:
        status === "cancelled" ? "Yes, cancel it" : "Yes, confirm",
      cancelButtonText: "No, go back",
      confirmButtonColor: status === "cancelled" ? "#d33" : "#16A34A",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_REACT_APP_ADMIN_VERIFY_USER_ORDER}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: order_id,
            status: status,
            delivery_date: deliveryDate,
          }),
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              // console.log("Response Data:", data); // Log the response data
              // Optionally update the UI or redirect the user
              // console.log("Order updated successfully.");
              Swal.fire({
                title: "Success!",
                text: `Order has been ${status}.`,
                icon: "success",
                confirmButtonText: "Close",
                confirmButtonColor: "#374151",
              });
            } else {
              console.error("Failed to update the order.");
              Swal.fire({
                title: "Error",
                text: "Failed to update the order. Please try again.",
                icon: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#374151",
              });
            }
          })
          .catch((error) => {
            console.error("Error updating order:", error);
            Swal.fire({
              title: "Error",
              text: "There was a problem updating the order.",
              icon: "error",
              confirmButtonText: "Close",
              confirmButtonColor: "#374151",
            });
          });
      }
    });
  };

  // const dateInputRef = useRef(null);

  const handleDateDivClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // This will show the date picker in modern browsers
      dateInputRef.current.focus(); // Fallback for browsers that do not support showPicker
    }
  };

  return (
    <section className="mx-auto mb-[14rem] px-5 md:px-8 ">
      <div className="mx-auto ">
        <h1 className="flex items-center gap-4 text-2xl font-semibold tracking-tight text-gray-800 mb-6">
          {" "}
          <Link to={`/admin/orders`}>
            <ArrowLeftCircleIcon size={25} />
          </Link>{" "}
          Order Details
        </h1>

        {error && (
          <div className="flex items-center justify-center font-medium py-5">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {/* FIRST GRID  */}
          <div className="lg:col-span-2">
            {/* ITEM Details */}
            <div className="mx-auto bg-white py-10 rounded-lg px-6">
              <div className="overflow-auto max-h-[22rem]">
                <table className="w-full table-auto text-sm text-left bg-white">
                  <thead className="text-gray-600 font-medium border-b">
                    <tr>
                      <th className="py-3 px-6">Item Summary</th>
                      <th className="py-3 px-6">Quantity</th>
                      <th className="py-3 px-6">Size</th>
                      <th className="py-3 px-6">Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y">
                    {ProductDetail.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <img
                              src={`/products/${item.productimage}`}
                              alt="product image"
                              className="w-9 h-10 rounded-sm"
                            />
                            <span>{item.productname}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 pl-10 whitespace-nowrap">
                          {item.quantity}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.productprice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* DELIVERY DETAILS  */}
            <div className="flow-root bg-white py-10 px-6 rounded-lg mt-10">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Delivery details
              </h1>
              <hr className="border-gray-100 my-5" />
              {DeliveryDetail ? (
                <>
                  <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Address</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.address}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Street</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.street}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">City</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.city}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">State</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.state}
                      </dd>
                    </div>
                  </dl>
                </>
              ) : (
                <div className="flex items-center justify-center font-medium">
                  Loading...
                </div>
              )}
            </div>
          </div>

          {/* SECOND GRID  */}
          <div className="h-[22rem] pb-10 rounded-lg bg-white">
            {/* ORDER SUMMARY  */}
            <div className="flex flex-col w-[100%] p-8">
              <h1 className="text-[18px] font-semibold my-2 tracking-wider">
                Order Summary
              </h1>
              {DeliveryDetail ? (
                <>
                  <div className="mt-7 font-medium">
                    <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                      Order Date <span>{DeliveryDetail.o_date}</span>
                    </p>
                    <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                      Delivery Date <span>{DeliveryDetail.delivery_date}</span>
                    </p>
                    <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                      Delivery Fee: <span>₦2400.00</span>
                    </p>

                    <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                      Status {/* <span> */}
                      {DeliveryDetail.status === "cancelled" ? (
                        <span className="inline-flex items-center justify-center rounded-full border border-red-500 px-2.5 py-0.5 text-red-500">
                          <TriangleAlert size={10} className="mr-1" />
                          <span className="whitespace-nowrap text-xs">
                            Cancelled
                          </span>
                        </span>
                      ) : DeliveryDetail.status === "confirmed" ? (
                        <span className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                          <CheckCircle2 size={10} className="mr-1" />
                          <span className="whitespace-nowrap text-xs">
                            Confirmed
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700">
                          <Loader2Icon size={10} className="mr-1" />
                          <span className="whitespace-nowrap text-xs">
                            Pending
                          </span>
                        </span>
                      )}
                      {/* </span> */}
                    </p>
                  </div>
                  <hr className="my-3 mt-6" />
                  <p className="my-2 text-[16px] mb-3 font-medium flex justify-between">
                    Total:{" "}
                    <span className="font-medium">₦{calculateTotal()}</span>
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-center font-medium">
                  Loading...
                </div>
              )}
            </div>
            {/* CUSTOMER DETAILS  */}
            <div className="flow-root bg-white py-10 px-6 rounded-lg mt-8">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Customer details
              </h1>
              <hr className="border-gray-100 my-5" />

              {DeliveryDetail ? (
                <>
                  <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Full Name</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.name}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Phone number
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.mobile}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Email address
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.email}
                      </dd>
                    </div>
                  </dl>
                </>
              ) : (
                <div className="flex items-center justify-center font-medium">
                  Loading...
                </div>
              )}
            </div>
            {/* VERIFY ORDER  */}
            <div className="mt-8 px-8 bg-white rounded-lg py-8">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Verify order
              </h1>
              <hr className="border-gray-100 my-4" />
              <form>
                <p className="text-xs text-gray-800 font-medium pb-2">
                  {DeliveryDetail &&
                    (DeliveryDetail.delivery_date === "" ? (
                      <span>Select a delivery date</span>
                    ) : (
                      <span>Select new delivery date</span>
                    ))}
                </p>
                <div className="relative" onClick={handleDateDivClick}>
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                    <Calendar className="text-gray-800" size={15} />
                  </div>
                  <input
                    ref={dateInputRef}
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Set the minimum date to today
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5 cursor-pointer"
                    placeholder="Select date"
                    required
                  />
                </div>

                <div className="mt-6 flex gap-5">
                  <button
                    type="button"
                    onClick={() => handleOrderUpdate("cancelled")}
                    className="block rounded-md border bg-red-600 text-center py-3 text-sm text-gray-100 transition hover:opacity-80 w-full"
                    // disabled
                  >
                    Cancel order
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderUpdate("confirmed")}
                    className="block rounded-md bg-green-700 text-center py-3 text-sm text-gray-100 transition hover:opacity-80 w-full"
                    // disabled
                  >
                    Confirm order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
