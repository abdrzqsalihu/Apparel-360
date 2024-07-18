import HomePage from "./pages/Home/Page";
import { Route, Routes, useLocation } from "react-router-dom";
import Shop from "./pages/Products/Shop";
import ShopDetails from "./pages/Products/ShopDetails";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import LogIn from "./pages/auth/LogIn";
import Register from "./pages/auth/Register";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import OrderDetail from "./pages/OrderDetail";
import AdminLayout from "./admin/AdminLayout";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const isOnAdminPage = location.pathname.startsWith("/admin");
  return (
    <>
      <ScrollToTop />
      {!isOnAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/orderdetails/:delivery_id/:order_id"
          element={<OrderDetail />}
        />
        {/* AUTH ROUTES  */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        {/* ADMIN ROUTES  */}
        {/* <Route path="/admin" element={<AdminLayout />} /> */}
        {/* Admin Route */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
}

export default App;
