/* eslint-disable react/no-unescaped-entities */
import { CircleCheckBig } from "lucide-react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex items-center justify-center">
      <section className="mt-10">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <CircleCheckBig className="mb-4 text-green-600" size={45} />
            <h1 className="text-[1.3rem] md:text-2xl font-medium mt-3">
              You've successfully placed your Order
            </h1>
            <Link
              to="/shop"
              className="block rounded bg-gray-800 text-center py-3 text-sm text-gray-100 transition hover:bg-gray-600 w-[60%] mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Success;
