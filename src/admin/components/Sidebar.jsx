import {
  ArrowLeftToLine,
  BarChartBig,
  BookText,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareDot,
  Settings,
  ShoppingBag,
  Store,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Sidebar({ openNavigation, toggleNavigation }) {
  const location = useLocation();
  console.log(location);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if (openNavigation) {
        toggleNavigation();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openNavigation]);
  const handleClick = () => {
    if (openNavigation) {
      toggleNavigation();
    }
  };
  return (
    <div ref={sidebarRef}>
      <div
        className={`${
          openNavigation
            ? "flex w-[17rem] ease-out md:w-auto"
            : "hidden md:flex"
        }  h-screen flex-col justify-between border-e bg-white z-50`}
      >
        <div className="py-5">
          <div className="px-4 flex items-center justify-between border-b border-gray-300 pb-4">
            <div className="flex items-center h-9 w-36 place-content-center">
              <img className="w-9 h-9" src="/logo.svg" width={40} alt="logo" />
              <p className="text-sm ml-2 font-semibold">APPAREL 360</p>
            </div>

            <div>
              <ArrowLeftToLine
                size={26}
                className="border border-gray-200 p-[0.35rem] rounded-md cursor-pointer"
                onClick={() => {
                  handleClick();
                }}
              />
            </div>
          </div>

          <ul className="px-4 mt-6 space-y-2 border-b border-gray-300 pb-5">
            <p className="text-[0.7rem] text-gray-500 font-medium tracking-wider">
              GENERAL
            </p>
            <li>
              <Link
                to={`dashboard`}
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/dashboard" ||
                  location.pathname === "/admin/"
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => {
                  handleClick();
                }}
              >
                <LayoutDashboard size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={`orders`}
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/orders" ||
                  /^\/admin\/orders\/orderdetails\/\d+/.test(location.pathname)
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => {
                  handleClick();
                }}
              >
                <ShoppingBag size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Orders
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={`customers`}
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/customers" ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  handleClick();
                }}
              >
                <Users size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Customers
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={`messages`}
                className={`flex w-full items-center justify-between rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/messages" ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center text-sm font-medium text-gray-800 tracking-tighter">
                  <MessageSquareDot size={16} />
                  <p className="ml-2">Messages</p>
                </div>

                <div className="bg-gray-100 font-semibold px-[0.4rem] text-xs rounded-md">
                  7
                </div>
              </Link>
            </li>
          </ul>
          <ul className="px-4 mt-6 space-y-2 border-b border-gray-300 pb-5">
            <p className="text-[0.7rem] text-gray-500 font-medium tracking-wider">
              TOOLS
            </p>
            <li>
              <Link
                to="products"
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/products" ? "bg-gray-100" : ""
                }`}
              >
                <Store size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="blogs"
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/blogs" ? "bg-gray-100" : ""
                }`}
              >
                <BookText size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Blogs
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="invoices"
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/invoices" ? "bg-gray-100" : ""
                }`}
              >
                <FileText size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Invoice
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="analytics"
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/analytics" ? "bg-gray-100" : ""
                }`}
              >
                <BarChartBig size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Analytics
                </span>
              </Link>
            </li>
          </ul>
          <ul className="px-4 mt-6 space-y-2 ">
            <p className="text-[0.7rem] text-gray-500 font-medium tracking-wider">
              ACCOUNT
            </p>
            <li>
              <Link
                to="settings"
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/settings" ? "bg-gray-100" : ""
                }`}
              >
                <Settings size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="admin"
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/admin" ? "bg-gray-100" : ""
                }`}
              >
                <UserPlus size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Admin control
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex w-full items-center rounded-md px-2 py-2 mt-2"
              >
                <LogOut size={16} />
                <Link className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Logout
                </Link>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <button className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
