import { Calendar, Loader2Icon } from "lucide-react";
import { useRef } from "react";

function OrderDetails() {
  const tableItems = [
    {
      name: "Solo learn app",
      qty: "9",
      size: "M",
      price: "3500",
    },
    {
      name: "Window wrapper",
      qty: "1",
      size: "XL",
      price: "5000",
    },
    {
      name: "Unity loroin",
      qty: "5",
      size: "S",
      price: "200",
    },
    {
      name: "Background remover",
      qty: "9",
      size: "L",
      price: "3200",
    },
  ];

  const dateInputRef = useRef(null);

  const handleDateDivClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // This will show the date picker in modern browsers
      dateInputRef.current.focus(); // Fallback for browsers that do not support showPicker
    }
  };
  return (
    <section className="mx-auto mb-[14rem] px-5 md:px-8 ">
      <div className="mx-auto ">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800 mb-6">
          Order Details
        </h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {/* FIRST GRID  */}
          <div className="lg:col-span-2">
            <div className="mx-auto bg-white py-10 rounded-lg px-6">
              <div className="overflow-auto">
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
                    {tableItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <img
                              src={`/products/product_3.jpg`}
                              alt="product image"
                              className="w-8 h-9"
                            />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 pl-10 whitespace-nowrap">
                          {item.qty}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flow-root bg-white py-10 px-6 rounded-lg mt-10">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Delivery details
              </h1>
              <hr className="border-gray-100 my-5" />
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Address</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    Chicken republic junction
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Street</dt>
                  <dd className="text-gray-700 sm:col-span-2">Ladan street</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">City</dt>
                  <dd className="text-gray-700 sm:col-span-2">Zuba</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">State</dt>
                  <dd className="text-gray-700 sm:col-span-2">Abuja</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* SECOND GRID  */}
          <div className="h-[20rem] pb-10 rounded-lg bg-white">
            <div className="flex flex-col w-[100%] p-8">
              <h1 className="text-[18px] font-semibold my-2 tracking-wider">
                Order Summary
              </h1>
              <div className="mt-7 font-medium">
                <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                  Order Date <span>2024-07-21</span>
                </p>
                <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                  Delivery Fee: <span>₦2400.00</span>
                </p>

                <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                  Status{" "}
                  <span>
                    <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                      <Loader2Icon size={10} className="mr-1" />
                      <p className="whitespace-nowrap text-sm">Pending</p>
                    </span>
                  </span>
                </p>
              </div>
              <hr className="my-3 mt-6" />
              <p className="my-2 text-[16px] mb-3 font-medium tracking-tight flex justify-between">
                Total: <span className="font-medium">₦4670.00</span>
              </p>
            </div>

            <div className="flow-root bg-white py-10 px-6 rounded-lg mt-8">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Customer details
              </h1>
              <hr className="border-gray-100 my-5" />

              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Full Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    Abdulrazaq Salihu
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Phone number</dt>
                  <dd className="text-gray-700 sm:col-span-2">08085458632</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Email address</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    abdrzq.salihu@gmail.com
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 px-8 bg-white rounded-lg py-8">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Verify order
              </h1>
              <hr className="border-gray-100 my-4" />
              <form>
                <p className="text-xs text-gray-800 font-medium pb-2">
                  Select delivery date
                </p>
                <div className="relative" onClick={handleDateDivClick}>
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                    <Calendar className="text-gray-800" size={15} />
                  </div>
                  <input
                    ref={dateInputRef}
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5 cursor-pointer"
                    placeholder="Select date"
                  />
                </div>

                <div className="mt-6 flex gap-5">
                  <button
                    type="submit"
                    className="block rounded-md border bg-red-600 text-center py-3 text-sm text-gray-100 transition hover:opacity-80 w-full"
                    // disabled
                  >
                    Cancel order
                  </button>
                  <button
                    type="submit"
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
