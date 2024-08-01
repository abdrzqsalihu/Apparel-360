import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import Settings from "./pages/Settings";
import { useState } from "react";
import OrderDetails from "./pages/orders/components/OrderDetails";
import Customers from "./pages/customers/Customers";
import Messages from "./pages/messages/Messages";
import Blogs from "./pages/blogs/Blogs";

function AdminLayout() {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    // console.log("Toggling navigation. Current state:", openNavigation);
    setOpenNavigation((prev) => {
      const newState = !prev;
      // console.log("New state:", newState);
      return newState;
    });
  };
  return (
    <div className="relative lg:flex overflow-hidden overflow-y-auto bg-gray-100 h-screen">
      <div
        className={`flex h-full md:w-64 flex-col fixed inset-y-0 z-50 transition-all duration-300 ease-in-out ${
          openNavigation
            ? "translate-x-0"
            : "-translate-x-full md:-translate-x-0"
        }`}
      >
        <Sidebar
          openNavigation={openNavigation}
          toggleNavigation={toggleNavigation}
        />
      </div>

      <div className="flex flex-col flex-grow ">
        <Navbar
          openNavigation={openNavigation}
          toggleNavigation={toggleNavigation}
        />
        <div className="mt-[7rem] md:ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="orders/orderdetails/:order_id"
              element={<OrderDetails />}
            />
            <Route path="/customers" element={<Customers />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/products" element={<Products />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
