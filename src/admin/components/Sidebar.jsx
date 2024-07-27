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
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Sidebar({ openNavigation, toggleNavigation }) {
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
                className="flex w-full items-center bg-gray-100 rounded-md px-2 py-2 mt-2"
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
                to={`/`}
                className="flex w-full items-center rounded-md px-2 py-2 mt-2"
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
                to={`/`}
                className="flex w-full items-center rounded-md px-2 py-2 mt-2"
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
                to={`/`}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 mt-2"
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
              <div className="flex w-full items-center rounded-md px-2 py-2 mt-2">
                <Store size={16} />
                <Link
                  to="products"
                  className="text-sm font-medium text-gray-800 ml-2 tracking-tighter"
                >
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex w-full items-center rounded-md px-2 py-2 mt-2">
                <BookText size={16} />
                <Link
                  to="blogs"
                  className="text-sm font-medium text-gray-800 ml-2 tracking-tighter"
                >
                  Blogs
                </Link>
              </div>
            </li>
            <li>
              <div className="flex w-full items-center rounded-md px-2 py-2 mt-2">
                <FileText size={16} />
                <Link
                  to=""
                  className="text-sm font-medium text-gray-800 ml-2 tracking-tighter"
                >
                  Invoice
                </Link>
              </div>
            </li>
            <li>
              <div className="flex w-full items-center rounded-md px-2 py-2 mt-2">
                <BarChartBig size={16} />
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-800 ml-2 tracking-tighter"
                >
                  Analytics
                </Link>
              </div>
            </li>
          </ul>
          <ul className="px-4 mt-6 space-y-2 ">
            <p className="text-[0.7rem] text-gray-500 font-medium tracking-wider">
              ACCOUNT
            </p>
            <li>
              <div className="flex w-full items-center rounded-md px-2 py-2 mt-2">
                <Settings size={16} />
                <Link
                  to="settings"
                  className="text-sm font-medium text-gray-800 ml-2 tracking-tighter"
                >
                  Settings
                </Link>
              </div>
            </li>
            <li>
              <div className="flex w-full items-center rounded-md px-2 py-2 mt-2">
                <UserPlus size={16} />
                <Link
                  to=""
                  className="text-sm font-medium text-gray-800 ml-2 tracking-tighter"
                >
                  Admin control
                </Link>
              </div>
            </li>
            <li>
              <div className="flex w-full items-center rounded-md px-2 py-2 mt-2">
                <LogOut size={16} />
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-800 ml-2 tracking-tighter"
                >
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
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
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
