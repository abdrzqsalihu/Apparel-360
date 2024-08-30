import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-50 mt10 mt-40">
        <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <div className="text-[1.4rem] font-bold">
                <Link
                  className="text-black transition font-mono flex flex-col md:flex-row items-center md:gap-5"
                  to="/"
                >
                  <img src="/logo.svg" width={40} alt="logo" />
                  <span>APPAREL 360</span>
                </Link>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
