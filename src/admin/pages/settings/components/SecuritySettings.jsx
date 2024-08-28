import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function SecuritySettings() {
  const [adminId, setAdminId] = useState({
    userId: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  //   GET ADMIN INFO DATA
  useEffect(() => {
    // Fetch admin details from API endpoint
    fetch(import.meta.env.VITE_REACT_APP_GET_ADMIN_DATA, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAdminId({
          userId: data.id,
        });

        console.log("Fetched user data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // setError(error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    // if (newPassword !== confirmNewPassword) {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "New passwords do not match.",
    //     icon: "error",
    //     confirmButtonColor: "#374151",
    //     confirmButtonText: "Close",
    //   });
    //   return;
    // }

    // Prepare form data
    const formData = new FormData();
    formData.append("userid", adminId.userId);
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmNewPassword", confirmNewPassword);
    // formData.append("twoFactorEnabled", isTwoFactorEnabled);

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_UPDATE_ADMIN_DETAILS,
        {
          method: "POST",
          body: formData,
          credentials: "include", // Ensures cookies are sent
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Password updated successfully.",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
        // Clear input fields on success
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Error! Please try again.",
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div className="py-5 pb-8 text-gray-600">
      <div className="border-b">
        <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight px-4 pb-3">
          Security Settings
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-5 mt-5 px-6">
          <div>
            <div className="w-full">
              <label className="font-medium text-xs">Change Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                // minLength="5"
                className="w-full mt-2 px-3 py-3 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100 text-xs"
                placeholder="Current Password"
              />
            </div>
          </div>
          <div className="w-full">
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength="8"
              className="w-full px-3 py-3 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100 text-xs"
              placeholder="New Password"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              minLength="8"
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
                    checked={isTwoFactorEnabled}
                    onChange={(e) => setIsTwoFactorEnabled(e.target.checked)}
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
      </form>
    </div>
  );
}

export default SecuritySettings;
