import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import Settings from "./pages/settings/Settings";
import { useState } from "react";
import OrderDetails from "./pages/orders/components/OrderDetails";
import Customers from "./pages/customers/Customers";
import Messages from "./pages/messages/Messages";
import Blogs from "./pages/blogs/Blogs";
import AddProduct from "./pages/products/AddProduct";
import AddBlog from "./pages/blogs/AddBlog";
import Analytics from "./pages/analytics/Analytics";
import Login from "./pages/auth/Login";
import Users from "./pages/users/Users";
import AddUser from "./pages/users/components/AddUser";
import MessageDetails from "./pages/messages/components/MessageDetails";
import useAuth from "./contexts/AuthContext";

function AdminLayout() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const isAuthenticated = useAuth(); // Check if authenticated

  const isOnAuthPage = location.pathname.startsWith("/admin/auth/login");

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
        {!isOnAuthPage && (
          <Sidebar
            openNavigation={openNavigation}
            toggleNavigation={toggleNavigation}
          />
        )}
      </div>

      <div className="flex flex-col flex-grow ">
        {!isOnAuthPage && (
          <Navbar
            openNavigation={openNavigation}
            toggleNavigation={toggleNavigation}
          />
        )}
        <div className={`${!isOnAuthPage ? "mt-[7rem] md:ml-64" : ""}`}>
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
            <Route
              path="/messages/messagedetails/:message_id"
              element={<MessageDetails />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="products/addproduct" element={<AddProduct />} />
            <Route
              path="/products/edit/:productId"
              element={<AddProduct />}
            />{" "}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="blogs/addblog" element={<AddBlog />} />
            <Route path="/blogs/edit/:blogId" element={<AddBlog />} />{" "}
            {/* Route for editing */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="users/adduser" element={<AddUser />} />
            <Route path="/users/edit/:userId" element={<AddUser />} />{" "}
            {/* Auth Routes  */}
            <Route
              path="/auth/login"
              element={
                isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
