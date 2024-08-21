import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function AddUser() {
  const roles = [
    "Super Admin",
    "Product Manager",
    "Customer Support",
    "Order Manager",
  ];

  return (
    <div>
      <main className="w-full flex flex-col items-center justify-center mt-10 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
          <div className="text-center">
            <ul className="flex flex-col items-center justify-center gap-2 text-[1rem] mt-0 md:text-[1.3rem] font-bold tracking-wider">
              <li>
                <Link
                  className="text-black transition font-mono flex flex-col items-center"
                  to="/"
                >
                  <img
                    className="mb-3 hidden md:block"
                    src="/logo.svg"
                    width={50}
                    alt="logo"
                  />
                  <span>APPAREL 360</span>
                </Link>
              </li>
            </ul>
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-xl font-semibold md:text-xl tracking-tight">
                Create a new user account
              </h3>
            </div>
          </div>
          <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="font-medium text-xs">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-xs">Last Name</label>
                <input
                  type="text"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-xs">Email</label>
                <input
                  type="email"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-xs">Password</label>
                <input
                  type="password"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>

              <div>
                <div className="relative mx-auto my-5">
                  <label className="font-medium text-xs">Select Role</label>

                  <ChevronDown className="absolute top-8 bottom-0 w-5 h-5 my-auto text-gray-400 right-3" />
                  <select className="mt-2 w-full px-3 py-2 text-sm text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-gray-800 focus:ring-2">
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:opacity-80 rounded-lg duration-150 text-sm">
                Create account
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddUser;
