import { AtSign, Eye, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
function Register() {
  return (
    <div className="px-6">
      <div className="w-full py-20">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-bold sm:text-[1.7rem]">
            Get started today!
          </h1>

          <p className="text-sm mt-4 text-gray-500">
            Creating an account helps you shop faster, be up to date on an
            order's status, and keep track of the orders you have previously
            made.
          </p>
        </div>

        <form action="#" className="mx-auto mb-0 mt-10 max-w-md space-y-7">
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Full name"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <User className="size-4 text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Email address"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AtSign className="size-4 text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>

            <div className="relative">
              <input
                type="tel"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Phone number"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <Phone className="size-4 text-gray-400" />
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
                placeholder="Password"
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
              Register
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Already hava an account ?
            <Link className="underline ml-2" to="/login">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
