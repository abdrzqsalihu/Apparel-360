import {
  ArrowLeftToLine,
  BarChartBig,
  BookText,
  CircleUser,
  // FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareDot,
  Settings,
  ShoppingBag,
  Store,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
function Sidebar({ openNavigation, toggleNavigation }) {
  const location = useLocation();
  // console.log(location);
  const sidebarRef = useRef(null);

  const [messageCount, setMessageCount] = useState(0);
  const [adminDetail, setAdminDetail] = useState({
    fullName: "",
    email: "",
    image: null,
    imagePreview: "", // State for image preview
  });

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

  //   GET ADMIN INFO DATA
  useEffect(() => {
    // Fetch admin details from API endpoint
    fetch(import.meta.env.VITE_REACT_APP_GET_ADMIN_DATA, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAdminDetail({
          fullName: data.fullname,
          email: data.email,
          imagePreview: data.display_img
            ? `/displayphotos/${data.display_img}`
            : "",
        });

        console.log("Fetched user data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // setError(error.message);
      });
  }, []);

  useEffect(() => {
    // Fetch message count from the API
    const fetchMessageCount = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_ADMIN_STATS
        );
        const data = await response.json();
        setMessageCount(data.pendingMessages || 0);
      } catch (error) {
        console.error("Error fetching message count:", error);
      }
    };

    fetchMessageCount();
  }, []);

  // LOGOUT FUNCTION
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_ADMIN_AUTH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "logout",
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        // Clear the auth token
        localStorage.removeItem("authToken");

        Swal.fire({
          title: "Success!",
          text: "Logout successful",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        // Redirect to login page
        navigate("/admin/auth/login");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to log out. Please try again.",
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred during logout. Please try again.",
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
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
                  location.pathname === "/admin/messages" ||
                  /^\/admin\/messages\/messagedetails\/\d+/.test(
                    location.pathname
                  )
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center text-sm font-medium text-gray-800 tracking-tighter">
                  <MessageSquareDot size={16} />
                  <p className="ml-2">Feedback & Queries</p>
                </div>

                <div className="bg-gray-100 font-semibold px-[0.4rem] text-xs rounded-md">
                  {messageCount}
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
                  location.pathname === "/admin/products" ||
                  location.pathname === "/admin/products/addproduct" ||
                  /^\/admin\/products\/edit\/\d+$/.test(location.pathname)
                    ? "bg-gray-100"
                    : ""
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
                  location.pathname === "/admin/blogs" ||
                  location.pathname === "/admin/blogs/addblog" ||
                  /^\/admin\/blogs\/edit\/\d+$/.test(location.pathname)
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <BookText size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Blogs
                </span>
              </Link>
            </li>
            {/* <li>
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
            </li> */}
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
                to="users"
                className={`flex w-full items-center rounded-md px-2 py-2 mt-2 ${
                  location.pathname === "/admin/users" ||
                  location.pathname === "/admin/users/adduser"
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <UserPlus size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  User management
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full items-center rounded-md px-2 py-2 mt-2"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium text-gray-800 ml-2 tracking-tighter">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <button className="flex items-center text-left gap-2 bg-white p-4 hover:bg-gray-50">
            <>
              {adminDetail.imagePreview ? (
                <img
                  alt="display_photo"
                  src={adminDetail.imagePreview}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <CircleUser
                  strokeWidth={1}
                  className="size-10 rounded-full text-gray-500"
                />
              )}
            </>
            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {adminDetail.fullName}
                </strong>

                <span>{adminDetail.email}</span>
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
