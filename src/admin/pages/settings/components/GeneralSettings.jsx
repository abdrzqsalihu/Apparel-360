import { UploadCloud, X } from "lucide-react";

function GeneralSettings() {
  return (
    <div>
      <div className="py-5 pb-8 text-gray-600">
        <div className="border-b">
          <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight px-4 pb-3">
            General details
          </h1>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-5 mt-5 px-6">
            <div>
              <label className="font-medium text-xs">Display photo</label>

              <div className="flex gap-5 mt-3">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="size-12 rounded-full object-cover"
                />

                <div className="flex  items-center gap-5">
                  <button className="text-[0.7rem] bg-gray-800 text-white p-1.5 px-2 flex items-center gap-1 rounded-md">
                    <UploadCloud size={13} /> Upload
                  </button>
                  <button className="text-[0.7rem] bg-red-500 text-white p-1.5 px-2 flex items-center gap-1 rounded-md">
                    <X size={13} /> Remove
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 justify-between">
                <div className="w-full">
                  <label className="font-medium text-xs">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium text-xs">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 justify-between">
                <div className="w-full">
                  <label className="font-medium text-xs">Email</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium text-xs">Phone Number</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-5 justify-between mt-8">
                <div>
                  <h1 className="font-medium text-sm text-gray-800 mb-1">
                    Appearance
                  </h1>
                  <p className="font-medium text-xs">
                    Customize how the theme looks on your device
                  </p>
                </div>
                <div>
                  <div>
                    <select
                      name="theme"
                      className="mt-1.5 w-full rounded-lg border bg-gray-100 py-1 border-gray-300 text-gray-700 sm:text-sm"
                    >
                      <option value="" disabled className="w-0">
                        select theme
                      </option>
                      <option value="light" selected>
                        Light
                      </option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-10 flex">
            <button
              type="submit"
              className="block rounded-md font-medium bg-gray-800 py-3 text-sm text-gray-100 transition hover:opacity-90 mt-8 px-24 mx-6"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralSettings;
