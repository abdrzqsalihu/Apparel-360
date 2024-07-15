/* eslint-disable react/no-unescaped-entities */
import {
  //   Eye,
  EyeOff,
  LayoutGrid,
  ShoppingBag,
  User2,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div>
            <h1 className="text-[1.3rem] md:text-2xl font-semibold">
              Account Overview
            </h1>

            <hr className="mt-8" />
            <div className="flex items-center gap-5 my-8">
              <UserCircle className="size-[5rem] md:size-[7rem]" />
              <div className="flex flex-col gap-2">
                <h2 className="text-[1.2rem] md:text-[1.38rem] font-medium">
                  Hi, Abdulrazaq!
                </h2>
                <p className="text-[0.9rem] md:text-[1rem] text-gray-700 tracking-tight">
                  Total Orders: 20
                </p>
              </div>
            </div>

            <hr />

            <div className="mt-10">
              <h1 className="text-[1.1rem] md:text-[1.2rem] font-medium">
                Today's Order
              </h1>

              <div className="overflow-y-auto mt-6">
                <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
                        Delivery Time
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                        1.
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                        Nike Windrunne
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                        $70
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                        4
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                        S
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                        <span className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-2.5 py-1 text-white">
                          <p className="whitespace-nowrap text-sm">Pending</p>
                        </span>
                        {/* <span className="inline-flex items-center justify-center rounded-full bg-green-500 px-2.5 py-1 text-white">
                        <p className="whitespace-nowrap text-sm">Success</p>
                      </span> */}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        24/05/2024
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <a
                          href="#"
                          className="inline-block rounded bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
                        >
                          View details
                        </a>
                      </td>
                    </tr>
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
              My Orders
            </h1>

            <div className="overflow-y-auto mt-10">
              <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
                      Delivery Time
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-center">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                      1.
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      Nike Windrunne
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      $70
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      4
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      S
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      <span className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-2.5 py-1 text-white">
                        <p className="whitespace-nowrap text-sm">Pending</p>
                      </span>
                      {/* <span className="inline-flex items-center justify-center rounded-full bg-green-500 px-2.5 py-1 text-white">
                        <p className="whitespace-nowrap text-sm">Success</p>
                      </span> */}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      24/05/2024
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href="#"
                        className="inline-block rounded bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
                      >
                        View details
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Profile":
        return (
          <div>
            <h1 className="text-[1.3rem] md:text-2xl font-semibold">
              Account Information
            </h1>
            <div className="mx-auto md:w-[98%] flow-root rounded-lg border border-gray-100 py-3 shadow-sm mt-10">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Full name</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    Abdulrazaq Salihu
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Email address</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    abdrzq.salihu@gmail.com
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Phone number</dt>
                  <dd className="text-gray-700 sm:col-span-2">08085458632</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Password</dt>
                  <dd className="flex items-center justify-between text-gray-700 sm:col-span-2">
                    *********{" "}
                    <button>
                      <EyeOff size={16} />
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
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
