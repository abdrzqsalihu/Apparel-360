import { BadgeHelp, BellDot, MenuIcon } from "lucide-react";

function Navbar() {
  return (
    <div>
      <div className="flex p-5 border-b items-center justify-between md:justify-end bg-white h-[4.56rem] border-gray-300">
        <button id="menuButton" className="md:hidden">
          <MenuIcon />
        </button>

        <div className="flex items-center gap-7 mr-7">
          <a
            href="https://wa.me/+2348085458632"
            target="_blank"
            aria-label="WhatsApp Profile"
            className="hidden md:block"
          >
            <BadgeHelp
              size={22}
              strokeWidth={1.3}
              className="text-gray-500"
              // color="#5056FD"
            />
          </a>

          <BellDot size={20} className="text-gray-500" />
        </div>
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
              <strong className="block font-medium">Abdulrazaq Salihu</strong>

              <span className="text-gray-500"> Administrator</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
