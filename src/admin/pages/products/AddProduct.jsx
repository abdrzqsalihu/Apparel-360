import { ArrowLeftCircleIcon, UploadCloudIcon } from "lucide-react";
import { Link } from "react-router-dom";

function AddProduct() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="flex items-center gap-4 text-2xl font-semibold tracking-tight text-gray-800">
          {" "}
          <Link to={`/admin/products`}>
            <ArrowLeftCircleIcon size={25} />
          </Link>{" "}
          Add New Product
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <main className="mx-auto rounded-xl px-6 bg-white">
            <div className="py-12 px-4 text-gray-600">
              <div>
                <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight">
                  General Information
                </h1>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5 mt-5"
              >
                <div>
                  <label className="font-medium text-xs">Product Name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="font-medium text-xs">
                    Product Description
                  </label>
                  <textarea
                    required
                    className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none outline-none border focus:border-gray-800 bg-gray-100 shadow-sm rounded-lg"
                  ></textarea>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div>
                    <p className="font-medium text-xs">Size</p>
                    <span className="text-gray-500 text-xs">
                      Pick available size
                    </span>

                    <fieldset className="grid grid-cols-4 lg:grid-cols-6 mt-3 gap-3">
                      <legend className="sr-only">Sizes</legend>

                      <div>
                        <label
                          htmlFor="SizeXS"
                          className="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900 w-[3rem] h-[2.6rem]"
                        >
                          <div>
                            <p className="text-gray-900 -ml-1 -mt-1">XS</p>
                          </div>

                          <input
                            type="checkbox"
                            name="SizeOption"
                            value="XS"
                            id="SizeXS"
                            className="sr-only"
                          />
                        </label>
                      </div>

                      <div>
                        <label
                          htmlFor="SizeS"
                          className="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900 w-[3rem] h-[2.6rem]"
                        >
                          <div>
                            <p className="text-gray-900 -mt-1">S</p>
                          </div>

                          <input
                            type="checkbox"
                            name="SizeOption"
                            value="S"
                            id="SizeS"
                            className="sr-only"
                          />
                        </label>
                      </div>

                      <div>
                        <label
                          htmlFor="SizeM"
                          className="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900 w-[3rem] h-[2.6rem]"
                        >
                          <div>
                            <p className="text-gray-900 -mt-1">M</p>
                          </div>

                          <input
                            type="checkbox"
                            name="SizeOption"
                            value="M"
                            id="SizeM"
                            className="sr-only"
                          />
                        </label>
                      </div>

                      <div>
                        <label
                          htmlFor="SizeL"
                          className="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900 w-[3rem] h-[2.6rem]"
                        >
                          <div>
                            <p className="text-gray-900 -mt-1">L</p>
                          </div>

                          <input
                            type="checkbox"
                            name="SizeOption"
                            value="L"
                            id="SizeL"
                            className="sr-only"
                          />
                        </label>
                      </div>

                      <div>
                        <label
                          htmlFor="SizeXL"
                          className="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900 w-[3rem] h-[2.6rem]"
                        >
                          <div>
                            <p className="text-gray-900 -ml-1 -mt-1">XL</p>
                          </div>

                          <input
                            type="checkbox"
                            name="SizeOption"
                            value="XL"
                            id="SizeXL"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="SizeXXL"
                          className="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900 w-[3rem] h-[2.6rem]"
                        >
                          <div>
                            <p className="text-gray-900 -ml-2 -mt-1">XXL</p>
                          </div>

                          <input
                            type="checkbox"
                            name="SizeOption"
                            value="XXL"
                            id="SizeXXL"
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  <div>
                    <p className="font-medium text-xs">Category</p>
                    <span className="text-gray-500 text-xs">
                      Pick product category
                    </span>
                    <fieldset className="grid lg:grid-cols-3 mt-3 gap-4">
                      <legend className="sr-only">Category</legend>

                      <div>
                        <label
                          htmlFor="Men"
                          className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300
                        has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900"
                        >
                          <div>
                            <p className="text-gray-900">Men</p>
                          </div>

                          <input
                            type="radio"
                            name="DeliveryOption"
                            value="Men"
                            id="Men"
                            className="size-5 border-gray-300 text-gray-900"
                          />
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="Women"
                          className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300
                        has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900"
                        >
                          <div>
                            <p className="text-gray-900">Women</p>
                          </div>

                          <input
                            type="radio"
                            name="DeliveryOption"
                            value="Women"
                            id="Women"
                            className="size-5 border-gray-300 text-gray-900"
                          />
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="Unisex"
                          className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300
                        has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900"
                        >
                          <div>
                            <p className="text-gray-900">Unisex</p>
                          </div>

                          <input
                            type="radio"
                            name="DeliveryOption"
                            value="Unisex"
                            id="Unisex"
                            className="size-5 border-gray-300 text-gray-900"
                          />
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </main>

          <main className="mt-10 mx-auto rounded-xl px-6 bg-white">
            <div className="py-12 px-4 text-gray-600">
              <div>
                <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight">
                  Pricing and Stock
                </h1>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5 mt-5"
              >
                <div className="flex items-center gap-5 justify-between">
                  <div className="w-full">
                    <label className="font-medium text-xs">Product Price</label>
                    <input
                      type="text"
                      required
                      className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                    />
                  </div>
                  <div className="w-full">
                    <label className="font-medium text-xs">
                      Quantity Available
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
        <div>
          <div className="h-[27rem] rounded-xl p-8 bg-white">
            <h1 className="text-gray-800 text-[1.1rem] mt-3 font-semibold tracking-tight">
              Upload Product Image
            </h1>
            <div className="h-[16rem] mt-12 rounded-lg border border-gray-500 border-dashed flex items-center justify-center bg-gray-100">
              <label
                htmlFor="file"
                className="cursor-pointer text-center p-4 md:p-8 flex flex-col items-center"
              >
                <UploadCloudIcon size={55} className="text-gray-800" />
                <p className="mt-3 text-gray-500 max-w-xs mx-auto text-sm">
                  Click to Upload the image file
                </p>
              </label>
              <input id="file" type="file" className="hidden" />
            </div>
          </div>

          <div className="mt-16">
            <button
              type="submit"
              className="block rounded-md font-medium bg-gray-800 text-center py-3 text-sm text-gray-100 transition hover:opacity-90 w-[98%] mx-auto"
            >
              Add product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
