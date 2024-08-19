import { TrendingDown, TrendingUp } from "lucide-react";
import RenderBarChart from "./components/BarChart";
import RenderLineChart from "./components/LineChart";

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
      </div>
    </div>
  );
}

export default Analytics;
