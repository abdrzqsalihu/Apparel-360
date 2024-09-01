import { ArrowLeftCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrderDetail() {
  const { order_id } = useParams();
  const { delivery_id } = useParams();

  const [ProductDetail, setProductDetail] = useState(null);
  const [DeliveryDetail, setDeliveryDetail] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch product details from API endpoint
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_GET_USER_ORDER_DATA
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
          setProductDetail(data[0]);
        } else {
          setProductDetail(null);
        }
        // console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [order_id]);

  useEffect(() => {
    // Fetch product details from API endpoint
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_GET_USER_ORDER_DATA
      }?delivery_id=${delivery_id}`,
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
  }, [delivery_id]);

  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold flex gap-4 items-center">
                {" "}
                <Link to={`/dashboard`} state={{ activeTab: "Orders" }}>
                  <ArrowLeftCircleIcon size={25} />
                </Link>{" "}
                Order Details
              </h1>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex flex-1 flex-col items-center justify-center space-y-10 mb-10">
              {error && <div>{error}</div>}
              {ProductDetail ? (
                <>
                  <li className="w-[100%] flex flex-wrap items-center gap-4">
                    <div className="flex flex-row items-center justify-between gap-4 flex-grow">
                      <div className="flex flex-row items-center">
                        <img
                          src={`/products/${ProductDetail.productimage}`}
                          // alt={cartinfo.productimage}
                          className="w-24 md:w-28 h-24 md:h-28 rounded object-cover mr-4"
                        />

                        <div className="flex flex-col w-full lg:w-60">
                          <h3 className="text-sm text-gray-900 font-medium line-clamp-1">
                            {ProductDetail.productname}
                          </h3>
                          <dl className="mt-1 space-y-px text-[11px] text-gray-600">
                            <div>
                              <dt className="inline">Quantity:</dt>
                              <dd className="inline ml-2">
                                {ProductDetail.quantity}
                              </dd>
                            </div>
                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline ml-2">
                                {ProductDetail.size}
                              </dd>
                            </div>
                            <div>
                              <dt className="inline">Price:</dt>
                              <dd className="inline ml-2">
                                ₦ {ProductDetail.productprice}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <div className="flex items-center justify-center font-medium">
                  Loading...
                </div>
              )}
            </div>
            <h1 className="font-medium">Delivery Information</h1>
            {DeliveryDetail ? (
              <>
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                  <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Full name</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.name}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Phone number
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.mobile}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Street</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.street}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">City</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.city}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Delivery location
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.state}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Status</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {/* {DeliveryDetail.status} */}

                        {DeliveryDetail.status === "cancelled" ? (
                          <span className="inline-flex items-center justify-center rounded-full bg-red-500 px-2.5 py-1 text-white">
                            <p className="whitespace-nowrap text-sm">
                              Cancelled
                            </p>
                          </span>
                        ) : DeliveryDetail.status === "confirmed" ? (
                          <span className="inline-flex items-center justify-center rounded-full bg-green-500 px-2.5 py-1 text-white">
                            <p className="whitespace-nowrap text-sm">Success</p>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-2.5 py-1 text-white">
                            <p className="whitespace-nowrap text-sm">Pending</p>
                          </span>
                        )}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Address</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {DeliveryDetail.address}
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center font-medium">
                Loading...
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderDetail;
