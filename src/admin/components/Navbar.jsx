import { BadgeHelp, BellDot, MenuIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
function Navbar({ toggleNavigation, openNavigation }) {
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
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="size-10 rounded-full object-cover"
          />

          <div className="flex items-center gap-4">
            <p className="text-xs">
              <strong className="block font-medium">Abdulrazaq Salihu</strong>

              <span className="text-gray-500"> Administrator</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
