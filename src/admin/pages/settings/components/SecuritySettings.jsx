import { Lock } from "lucide-react";

function SecuritySettings() {
  return (
    <div className="py-5 pb-8 text-gray-600">
      <div className="border-b">
        <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight px-4 pb-3">
          Security Settings
        </h1>
      </div>

      <div className="space-y-5 mt-5 px-6">
        <div>
          <div className="w-full">
            <label className="font-medium text-xs">Change Password</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-3 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100 text-xs"
              placeholder="Current Password"
            />
          </div>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            className="w-full px-3 py-3 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100 text-xs"
            placeholder="New Password"
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            className="w-full px-3 py-3 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100 text-xs"
            placeholder="Confirm New Password"
          />
        </div>

        <div>
          <div className="flex items-center gap-5 justify-between mt-8">
            <div>
              <h1 className="font-medium text-sm text-gray-800 mb-1">
                Two-Factor Authentication
              </h1>
              <p className="font-medium text-xs flex items-center gap-2 mt-2">
                <Lock size={16} className="text-gray-500" /> Enable Two-Factor
                Authentication
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300 cursor-pointer mr-2"
                  id="authentication"
                />
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
    </div>
  );
}

export default SecuritySettings;
