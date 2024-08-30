/* eslint-disable react/no-unescaped-entities */
import {
  //   Eye,
  //   EyeOff,
  LayoutGrid,
  ShoppingBag,
  User2,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [userDetail, setUserDetail] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);

  //   GET USER INFO DATA
  useEffect(() => {
    // Fetch user details from API endpoint
    fetch(import.meta.env.VITE_REACT_APP_GET_USER_DATA, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUserDetail(data[0]);
        } else {
          setUserDetail(null);
        }
        // console.log("Fetched user data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(error.message);
      });
  }, []);

  // GET USER ORDER INFO
  useEffect(() => {
    // Fetch user details from API endpoint
    fetch(import.meta.env.VITE_REACT_APP_GET_USER_ORDER_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "order_details",
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
        if (Array.isArray(data) && data.length > 0) {
          setOrderDetails(data);
        } else {
          setOrderDetails([]); // Set to an empty array if no data is returned
        }
        // console.log("Fetched user data:", data);
      })
      .catch((error) => {
        // console.error("Error fetching user order data:", error);
        setError(error.message);
      });
  }, []);

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

  const renderTabContent = () => {
    const today = new Date().toISOString().split("T")[0];

    // Filter orders for today's date
    const todaysOrders = orderDetails.filter(
      (orderDetails) => orderDetails.order_date === today
    );

    // Calculate paginated data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orderDetails.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(orderDetails.length / itemsPerPage);
    switch (activeTab) {
      case "Overview":
        return (
          <div>
            <h1 className="text-[1.3rem] md:text-2xl font-semibold">
              Account Overview
            </h1>

            <hr className="mt-8" />
            {error && (
              <div className="flex items-center justify-center font-medium py-5">
                {error}
              </div>
            )}
            {userDetail ? (
              <>
                <div className="flex items-center gap-5 my-8">
                  <UserCircle className="size-[5rem] md:size-[7rem]" />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[1.2rem] md:text-[1.38rem] font-medium">
                      Hi, {userDetail.name.split(" ")[0]}!
                    </h2>
                    <p className="text-[0.9rem] md:text-[1rem] text-gray-700 tracking-tight">
                      Total {orderDetails.length > 1 ? "Orders" : "Order"}{" "}
                      {orderDetails.length}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center font-medium py-14">
                Loading...
              </div>
            )}
            <hr />

            <div className="mt-10">
              <h1 className="text-[1.1rem] md:text-[1.2rem] font-medium">
                Today's {todaysOrders.length > 1 ? "Orders" : "Order"}
              </h1>

              <div className="overflow-y-auto mt-6">
                <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm text-left">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        S/N
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Product Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Product Price
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Quantity
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Size
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Placed On
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Delivery Date
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-left">
                    {todaysOrders.length > 0 ? (
                      currentItems.map((order, index) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                            {index + 1}.
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {order.productname}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            ₦{order.productprice}.00
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {order.quantity}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {order.size}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {order.status === "cancelled" ? (
                              <span className="inline-flex items-center justify-center rounded-full bg-red-500 px-2.5 py-1 text-white">
                                <p className="whitespace-nowrap text-sm">
                                  Cancelled
                                </p>
                              </span>
                            ) : order.status === "confirmed" ? (
                              <span className="inline-flex items-center justify-center rounded-full bg-green-500 px-2.5 py-1 text-white">
                                <p className="whitespace-nowrap text-sm">
                                  Success
                                </p>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-2.5 py-1 text-white">
                                <p className="whitespace-nowrap text-sm">
                                  Pending
                                </p>
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {order.order_date}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {order.delivery_date
                              ? order.delivery_date
                              : "---- -- --"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            <Link
                              to={`/orderdetails/${order.orderid}/${order.id}`}
                              className="inline-block rounded bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
                            >
                              View details
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="whitespace-nowrap px-4 py-8 text-gray-700 text-center"
                        >
                          No orders for today.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "Orders":
        return (
          <div>
            <h1 className="text-[1.3rem] md:text-2xl font-semibold">
              All {orderDetails.length > 1 ? "Orders" : "Order"}{" "}
            </h1>
            {error && (
              <div className="flex items-center justify-center font-medium py-5">
                {error}
              </div>
            )}
            <div className="overflow-y-auto mt-10">
              <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm text-left">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      S/N
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Product Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Product Price
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Quantity
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Size
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Placed On
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Delivery Date
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                {orderDetails ? (
                  <>
                    <tbody className="divide-y divide-gray-200 te">
                      {currentItems.map((orderDetails, index) => (
                        <tr key={orderDetails.id}>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                            {index + 1}.
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {orderDetails.productname}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            ₦{orderDetails.productprice}.00
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {orderDetails.quantity}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {orderDetails.size}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {orderDetails.status === "cancelled" ? (
                              <span className="inline-flex items-center justify-center rounded-full bg-red-500 px-2.5 py-1 text-white">
                                <p className="whitespace-nowrap text-sm">
                                  Cancelled
                                </p>
                              </span>
                            ) : orderDetails.status === "confirmed" ? (
                              <span className="inline-flex items-center justify-center rounded-full bg-green-500 px-2.5 py-1 text-white">
                                <p className="whitespace-nowrap text-sm">
                                  Success
                                </p>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-2.5 py-1 text-white">
                                <p className="whitespace-nowrap text-sm">
                                  Pending
                                </p>
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {orderDetails.order_date}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {orderDetails.delivery_date
                              ? orderDetails.delivery_date
                              : "---- -- --"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <Link
                              to={`/orderdetails/${orderDetails.orderid}/${orderDetails.id}`}
                              className="inline-block rounded bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
                            >
                              View details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : (
                  <div className="flex items-center justify-center font-medium py-14">
                    Loading...
                  </div>
                )}
              </table>
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        );
      case "Profile":
        return (
          <div>
            <h1 className="text-[1.3rem] md:text-2xl font-semibold">
              Account Information
            </h1>
            {error && (
              <div className="flex items-center justify-center font-medium py-5">
                {error}
              </div>
            )}
            {userDetail ? (
              <>
                <div className="mx-auto md:w-[98%] flow-root rounded-lg border border-gray-100 py-3 shadow-sm mt-10">
                  <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Full name</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {userDetail.name}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Email address
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {userDetail.email}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Phone number
                      </dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {userDetail.phone}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">
                        Account created on
                      </dt>
                      <dd className="flex items-center justify-between text-gray-700 sm:col-span-2">
                        {userDetail.datecreated}{" "}
                        {/* <button>
                          <EyeOff size={16} />
                        </button> */}
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center font-medium py-14">
                Loading...
              </div>
            )}
          </div>
        );
      default:
      // return <div>Overview Content</div>;
    }
  };
  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              {/* <h1 className="text-2xl font-semibold">Dashboard</h1> */}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div>
              <div className="sm:hidden">
                <label htmlFor="Tab" className="sr-only">
                  Tab
                </label>

                <select
                  id="Tab"
                  className="w-full rounded-md border p-2 border-gray-200"
                  value={activeTab}
                  onChange={handleTabChange}
                >
                  <option value="Overview">Overview</option>
                  <option value="Orders">Orders</option>
                  <option value="Profile">Profile Details</option>
                </select>
              </div>

              <div className="hidden sm:block w-[35%] mx-auto">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex gap-14" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab("Overview")}
                      className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
                        activeTab === "Overview"
                          ? "border-gray-700 text-gray-900 font-semibold"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <LayoutGrid size={20} />
                      Overview
                    </button>

                    <button
                      onClick={() => setActiveTab("Orders")}
                      className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
                        activeTab === "Orders"
                          ? "border-gray-700 text-gray-900 font-semibold"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <ShoppingBag size={20} />
                      Orders
                    </button>

                    <button
                      onClick={() => setActiveTab("Profile")}
                      className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
                        activeTab === "Profile"
                          ? "border-gray-700 text-gray-900 font-semibold"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <User2 size={20} />
                      Profile Details
                    </button>
                  </nav>
                </div>
              </div>

              <div className="mt-14">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
