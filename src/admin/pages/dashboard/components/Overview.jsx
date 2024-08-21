import { useEffect, useState } from "react";
import {
  BaggageClaim,
  Eye,
  Info,
  MessageSquareDot,
  ShoppingBag,
} from "lucide-react";

function Overview() {
  const [stats, setStats] = useState({
    pageViews: 0,
    pendingMessages: 0,
    totalOrders: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    // Fetch data from the PHP backend
    fetch(import.meta.env.VITE_REACT_APP_ADMIN_STATS)
      .then((response) => response.json())
      .then((data) => {
        setStats({
          pageViews: data.pageViews,
          pendingMessages: data.pendingMessages,
          totalOrders: data.totalOrders,
          totalProducts: data.totalProducts,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-gray-800 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5">
        <div className="rounded-lg">
          <div className="h-32 rounded-lg border border-gray-200 bg-gray-50 px-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="flex gap-2 items-center">
                  <Eye
                    size={22}
                    className="bg-gray-100 p-1 text-gray-700 rounded-sm"
                  />
                  <span className="text-[1rem] font-medium tracking-tighter">
                    Page Views
                  </span>
                </p>
              </div>
              <div>
                <span className="rounded-full bg-primary p-3">
                  <Info size={14} className="text-gray-400" />
                </span>
              </div>
            </div>
            <div className="ml-1">
              <p className="text-2xl mt-0.5 font-medium text-gray-900">
                {stats.pageViews}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg">
          <div className="h-32 rounded-lg border border-gray-200 bg-gray-50 px-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="flex gap-2 items-center">
                  <MessageSquareDot
                    size={22}
                    className="bg-gray-100 p-1 text-gray-700 rounded-sm"
                  />
                  <span className="text-[1rem] font-medium tracking-tighter">
                    Pending Messages
                  </span>
                </p>
              </div>
              <div>
                <span className="rounded-full bg-primary p-3">
                  <Info size={14} className="text-gray-400" />
                </span>
              </div>
            </div>
            <div className="ml-1">
              <p className="text-2xl mt-0.5 font-medium text-gray-900">
                {stats.pendingMessages}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg">
          <div className="h-32 rounded-lg border border-gray-200 bg-gray-50 px-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="flex gap-2 items-center">
                  <BaggageClaim
                    size={22}
                    className="bg-gray-100 p-1 text-gray-700 rounded-sm"
                  />
                  <span className="text-[1rem] font-medium tracking-tighter">
                    Total Orders
                  </span>
                </p>
              </div>
              <div>
                <span className="rounded-full bg-primary p-3">
                  <Info size={14} className="text-gray-400" />
                </span>
              </div>
            </div>
            <div className="ml-1">
              <p className="text-2xl mt-0.5 font-medium text-gray-900">
                {stats.totalOrders}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg">
          <div className="h-32 rounded-lg border border-gray-200 bg-gray-50 px-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="flex gap-2 items-center">
                  <ShoppingBag
                    size={22}
                    className="bg-gray-100 p-1 text-gray-700 rounded-sm"
                  />
                  <span className="text-[1rem] font-medium tracking-tighter">
                    Total Products
                  </span>
                </p>
              </div>
              <div>
                <span className="rounded-full bg-primary p-3">
                  <Info size={14} className="text-gray-400" />
                </span>
              </div>
            </div>
            <div className="ml-1">
              <p className="text-2xl mt-0.5 font-medium text-gray-900">
                {stats.totalProducts}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
