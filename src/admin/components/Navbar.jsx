import { BadgeHelp, BellDot, CircleUser, MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Navbar({ toggleNavigation, openNavigation }) {
  const [adminDetail, setAdminDetail] = useState({
    fullName: "",
    email: "",
    image: null,
    imagePreview: "", // State for image preview
  });
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
          role: data.role,
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
  return (
    <div className="fixed w-full">
      <div className="flex p-5 border-b items-center justify-between md:justify-end bg-white h-[4.56rem] border-gray-300">
        <button
          id="menuButton"
          className="md:hidden"
          onClick={toggleNavigation}
        >
          <MenuIcon
            size={20}
            className={`${
              openNavigation ? "hidden" : "block"
            } text-gray-600 cursor-pointer`}
          />
        </button>

        <img
          src="/logo.svg"
          // className="w-12 h-12 md:hidden"
          className={`${
            openNavigation ? "hidden" : "flex"
          } md:hidden w-11 h-11`}
          alt="logo"
        />

        <div className="flex items-center gap-7 md:mr-7">
          <a
            href="https://wa.me/+2348085458632"
            target="_blank"
            aria-label="WhatsApp Profile"
            className="hidden md:block"
          >
            <BadgeHelp
              size={20}
              strokeWidth={1.3}
              className="text-gray-500"
              // color="#5056FD"
            />
          </a>

          <BellDot size={20} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="md:flex items-center gap-2 p-4 hidden cursor-pointer">
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

          <div className="flex items-center gap-4">
            <p className="text-xs">
              <strong className="block font-medium">
                {adminDetail.fullName}
              </strong>

              <span className="text-gray-500"> {adminDetail.role}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
