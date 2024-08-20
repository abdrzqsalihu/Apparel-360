import { TrendingDown, TrendingUp } from "lucide-react";
import RenderBarChart from "./components/BarChart";
import RenderLineChart from "./components/LineChart";
import RenderPieChart from "./components/PieChart";

function Analytics() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Analytics
        </h1>
      </div>

      <div className="mt-10">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="bg-white rounded-lg py-5 px-8 w-[50%]">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800">
              Sales
            </h1>
            <div className="flex mt-8">
              <div className="w-[13rem]">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 py-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Net Sales</p>
                    </div>

                    <div className="flex items-center gap-2 rounded bg-green-100 p-1 text-green-600">
                      <TrendingUp size={15} />
                      <span className="text-[0.68rem] font-medium">
                        {" "}
                        67.81%{" "}
                      </span>
                    </div>
                  </div>

                  <p className="text-2xl mt-3 font-medium text-gray-900">
                    $240.94
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 py-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Orders</p>
                    </div>

                    <div className="flex items-center gap-2 rounded bg-red-100 p-1 text-red-600">
                      <TrendingDown size={15} />
                      <span className="text-[0.68rem] font-medium">
                        {" "}
                        67.81%{" "}
                      </span>
                    </div>
                  </div>

                  <p className="text-2xl mt-3 font-medium text-gray-900">
                    1,256
                  </p>
                </div>
              </div>

              <div>
                <RenderBarChart />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg py-5 px-8 w-[50%]">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800">
              Customers
            </h1>
            <div className="flex mt-10">
              <div>
                <div className="mb-4">
                  <div className="flex flex-col mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>

                    <p className="text-2xl mt-2 font-medium text-gray-900">
                      1,240
                    </p>
                    <div className="flex flex-row items-center gap-1 mt-2 text-green-600">
                      <TrendingUp size={13} />
                      <span className="text-[0.6rem] font-medium flex">
                        67.81% (+15%)
                      </span>
                    </div>

                    <div className="mt-10">
                      <p className="text-xs text-gray-500">Total customers</p>
                      <p className="text-2xl mt-2 font-medium text-gray-900">
                        10,240
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-5">
                <RenderLineChart />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-10">
          <div className="bg-white rounded-lg py-5 px-8 max-w-[28%] w-[28%]">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800">
              Top Products
            </h1>
            <div className="mt-8">
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center border-b pb-4 cursor-pointer">
                  <img
                    src={`/products/product_1.png`}
                    // alt={cartinfo.productimage}
                    className="w-10 h-12 md:h-12 rounded-md object-cover mr-3"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xs text-gray-900 font-medium tracking-tight line-clamp-1">
                      Nike Sportswear Phoenix Fleece
                    </h1>
                    <p className="text-[0.68rem] mt-1.5 tracking-tighter">
                      Qty available: 72
                    </p>
                  </div>
                </div>
                <div className="flex items-center border-b pb-4 cursor-pointer">
                  <img
                    src={`/products/product_2.webp`}
                    // alt={cartinfo.productimage}
                    className="w-10 h-12 md:h-12 rounded-md object-cover mr-3"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xs text-gray-900 font-medium tracking-tight line-clamp-1">
                      Nike Air VaporMax 2023 Flyknit
                    </h1>
                    <p className="text-[0.68rem] mt-1.5 tracking-tighter">
                      Qty available: 59
                    </p>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer">
                  <img
                    src={`/products/product_4.jpeg`}
                    // alt={cartinfo.productimage}
                    className="w-10 h-12 md:h-12 rounded-md object-cover mr-3"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xs text-gray-900 font-medium tracking-tight line-clamp-1">
                      Addidas Leather Hoddie
                    </h1>
                    <p className="text-[0.68rem] mt-1.5 tracking-tighter">
                      Qty available: 32
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg py-5 px-8  max-w-[44%] w-[44%]">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800">
              Top Categories
            </h1>
            <div className="mt-8">
              <div className="flex justify-between items-center gap-3">
                <RenderPieChart />

                <div className="flex flex-col gap-5">
                  <div className="flex justify-between gap-20">
                    <h1 className="tracking-tight flex items-center text-sm text-gray-600 gap-2">
                      {" "}
                      <div className="w-3 h-3 bg-[#0680FA] rounded-full"></div>
                      Men
                    </h1>
                    <p className="font-semibold text-base">22.9%</p>
                  </div>
                  <div className="flex justify-between gap-20">
                    <h1 className="tracking-tight flex items-center text-sm text-gray-600 gap-2">
                      {" "}
                      <div className="w-3 h-3 bg-[#FC3CA4] rounded-full"></div>
                      Women
                    </h1>
                    <p className="font-semibold text-base">33.4%</p>
                  </div>
                  <div className="flex justify-between gap-20">
                    <h1 className="tracking-tight flex items-center text-sm text-gray-600 gap-2">
                      {" "}
                      <div className="w-3 h-3 bg-[#1F2937] rounded-full"></div>
                      Unisex
                    </h1>
                    <p className="font-semibold text-base">44.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg py-5 px-8  max-w-[28%] w-[28%]">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800">
              New Customers
            </h1>
            <div className="mt-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center border-b pb-4 cursor-pointer">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="size-11 rounded-full object-cover"
                  />
                  <div className="flex flex-col ml-4">
                    <h1 className="text-xs text-gray-900 font-medium tracking-tight line-clamp-1">
                      Musa Dikko
                    </h1>
                    <p className="text-[0.68rem] mt-1.5 tracking-tighter">
                      Date: 2024-07-15
                    </p>
                  </div>
                </div>
                <div className="flex items-center border-b pb-4 cursor-pointer">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    className="size-11 rounded-full object-cover"
                  />
                  <div className="flex flex-col ml-4">
                    <h1 className="text-xs text-gray-900 font-medium tracking-tight line-clamp-1">
                      Amira Sulaiman
                    </h1>
                    <p className="text-[0.68rem] mt-1.5 tracking-tighter">
                      Date: 2024-07-04
                    </p>
                  </div>
                </div>

                <div className="flex items-center cursor-pointer">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    className="size-11 rounded-full object-cover"
                  />
                  <div className="flex flex-col ml-4">
                    <h1 className="text-xs text-gray-900 font-medium tracking-tight line-clamp-1">
                      Atiku Abubakar
                    </h1>
                    <p className="text-[0.68rem] mt-1.5 tracking-tighter">
                      Date: 2024-06-29
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
