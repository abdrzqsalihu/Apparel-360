import { AtSign, Eye } from "lucide-react";
import { Link } from "react-router-dom";

function LogIn() {
  return (
    <div className="px-6">
      <div className="w-full py-20">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-[1.7rem]">Welcome back!</h1>
          <p className="text-sm mt-4 text-gray-500">
            Manage your account by logging in.
          </p>
        </div>

        <form action="#" className="mx-auto mb-0 mt-10 max-w-md space-y-7">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AtSign className="size-4 text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Eye className="size-4 text-gray-400" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-5 mb-2 inline-block rounded-lg bg-gray-700 hover:bg-gray-600 px-5 py-3 text-sm font-medium text-white w-full"
            >
              Log in
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            No account?
            <Link className="underline ml-2" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
