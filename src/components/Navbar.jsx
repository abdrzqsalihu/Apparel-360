import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { navLinks } from "../utils/constants";
import { useState } from "react";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white mt-6 mx-auto max-w-screen-xl">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden md:flex md:items-center">
            <a
              className="text-black text-[12px] flex items-center px-6"
              href="#"
            >
              <Phone size={16} />
              <span className="ml-1">+234-808-545-8632</span>
            </a>
          </div>

          <div className="md:block">
            <nav aria-label="Global">
              <ul className="flex flex-col items-center justify-center gap-2 text-[1.4rem] mt-0 md:mt-12 md:text-[1.6rem] font-bold">
                <li>
                  <a
                    className="text-black transition font-mono flex flex-col items-center"
                    href="/"
                  >
                    <img
                      className="mb-3 hidden md:block"
                      src="/logo.svg"
                      width={50}
                      alt="logo"
                    />
                    <span>APPAREL 360</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center">
            <div className="sm:flex sm:gap-4">
              <a
                className="relative inline-block text-sm pr-6 py-2.5 font-medium text-black"
                href="#"
              >
                <span className="relative">
                  <ShoppingCart size={28} />
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full px-[0.26rem] text-xs">
                    0
                  </span>
                </span>
              </a>

              <div className="hidden md:flex gap-8">
                <a className="py-2.5 text-[14px] text-black" href="#">
                  Log In
                </a>
                <a className="py-2.5 text-[14px] text-black" href="i#">
                  Register
                </a>
              </div>
            </div>

            <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-black transition hover:text-gray-500"
                aria-label="Menu Icon"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="hidden md:block mt-16 mb-8" />

      <div className="flex items-center justify-center">
        <div className="hidden md:block">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6">
              {navLinks.map((navLink, index) => (
                <li key={index}>
                  <a
                    className="text-black hover:opacity-80 uppercase text-[14px] font-medium px-1"
                    href={navLink.id}
                  >
                    {navLink.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu  */}
      <div
        className={`${
          isMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } transform origin-top transition-transform duration-300 ease-in-out absolute mt-1 left-0 w-full z-60 md:hidden`}
      >
        {isMenuOpen && (
          <div className="fixed left-0 w-full bg-white shadow-lg py-3">
            <ul className="space-y-2 p-2 px-8">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`cursor-pointer p-1 font-primary leading-6 text-secondary hover:text-primary hover:font-medium mr-0}`}
                >
                  <a
                    href={`#${nav.id}`}
                    className="w-full block uppercase text-center text-[14px] p-[0.3rem] hover:bg-gray-200 rounded-lg hover:font-semibold"
                    onClick={() => closeMenu()}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
