import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Checkout</h1>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-1 flex-col justify-center">
                <form action="#" className="space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className="w-full rounded-md border border-gray-200 p-3 text-sm"
                      placeholder="Full Name"
                      type="text"
                      id="name"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Email address"
                        type="email"
                        id="email"
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Phone Number"
                        type="tel"
                        id="phone"
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      name="location"
                      id="location"
                      className="mt-1.5 w-full rounded-md border p-3 border-gray-200 text-gray-500 sm:text-sm"
                    >
                      <option value="" disabled>
                        Select delivery location
                      </option>
                      <option value="Abuja">Abuja : ₦2000</option>
                      <option value="Lagos">Lagos : ₦5000</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="town">
                        Town / City
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Town / City"
                        type="text"
                        id="town"
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="appartment">
                        Apartment, suite, unit etc: (optional)
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Apartment, suite, unit etc: (optional)"
                        type="text"
                        id="appartment"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="message">
                      Message
                    </label>

                    <textarea
                      className="w-full rounded-md border border-gray-200 p-3 text-sm"
                      placeholder="Address"
                      rows="8"
                      id="address"
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="flex bg-gray-100 p-5 py-6 ml-0 lg:ml-10 mt-10 lg:mt-0 h-[19rem] w-full lg:w-[30%] rounded-md">
                <div className="flex flex-col w-[100%]">
                  <h1 className="text-[18px] font-semibold my-2 tracking-wider">
                    Order Total
                  </h1>
                  <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                    Subtotal: <span className="font-medium">$0</span>
                  </p>
                  <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                    Delivery: <span className="font-medium">$0</span>
                  </p>
                  <hr className="my-2" />
                  <p className="my-2 text-[16px] mb-3 font-medium tracking-tight flex justify-between">
                    Total: <span className="font-medium">$0</span>
                  </p>

                  <div className="mt-4 w-full">
                    <Link
                      to="#"
                      className="block rounded bg-gray-700 text-center py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Place Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
