import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Settings from "./pages/Settings";

function AdminLayout() {
  return (
    <div className="relative lg:flex overflow-hidden bg-gray-100 h-screen">
      <div className="flex md:h-full md:w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="mt-10 md:ml-72">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
