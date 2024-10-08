import { CircleUser, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function GeneralSettings() {
  const navigate = useNavigate();
  const [adminDetail, setAdminDetail] = useState({
    userId: "",
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    role: "",
    image: null,
    imagePreview: "", // State for image preview
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAdminDetail((prevAdminData) => ({
      ...prevAdminData,
      [id]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminDetail((prevAdminData) => ({
          ...prevAdminData,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = async () => {
    const confirmRemoval = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove your profile picture?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (confirmRemoval.isConfirmed) {
      try {
        // Create a FormData object
        const formData = new FormData();
        formData.append("userid", adminDetail.userId);
        formData.append("removeImage", true);

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
          setAdminDetail((prevAdminData) => ({
            ...prevAdminData,
            image: null,
            imagePreview: "",
          }));
          Swal.fire({
            title: "Success!",
            text: "Profile picture removed successfully",
            icon: "success",
            confirmButtonColor: "#374151",
            confirmButtonText: "Close",
          });
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
    }
  };

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
        setAdminDetail({
          userId: data.id,
          fullName: data.fullname,
          userName: data.username,
          email: data.email,
          phone: data.phone,
          role: data.role,
          imagePreview: data.display_img
            ? `/displayphotos/${data.display_img}`
            : "",
        });

        // console.log("Fetched user data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // setError(error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("fullname", adminDetail.fullName);
    submissionData.append("username", adminDetail.userName);
    submissionData.append("email", adminDetail.email);
    submissionData.append("phone", adminDetail.phone);

    if (adminDetail.image) {
      submissionData.append("image", adminDetail.image);
    }
    submissionData.append("userid", adminDetail.userId);

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_UPDATE_ADMIN_DETAILS,
        {
          method: "POST",
          body: submissionData,
        }
      );

      const result = await response.json();
      // console.log(result);

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Details updated successfully",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
        // reload page
        navigate("/admin/settings");
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
    <div>
      <div className="py-5 pb-8 text-gray-600">
        <div className="border-b">
          <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight px-4 pb-3">
            General details
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 mt-5 px-6">
            <div>
              <label className="font-medium text-xs">Display photo</label>

              <div className="flex gap-5 mt-3">
                <>
                  {adminDetail.imagePreview ? (
                    <img
                      alt="display_photo"
                      src={adminDetail.imagePreview}
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <CircleUser
                      strokeWidth={1}
                      className="size-11 rounded-full text-gray-500"
                    />
                  )}
                </>

                <div className="flex  items-center gap-5">
                  <label className="text-[0.7rem] bg-gray-800 text-white py-1.5 px-2 flex items-center gap-1 rounded-md cursor-pointer">
                    <UploadCloud size={13} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {adminDetail.imagePreview && (
                    <button
                      className="text-[0.7rem] bg-red-500 text-white py-1.5 px-2 flex items-center gap-1 rounded-md"
                      type="button"
                      onClick={handleImageRemove}
                    >
                      <X size={13} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 justify-between">
                <div className="w-full">
                  <label className="font-medium text-xs">Full Name</label>
                  <input
                    type="text"
                    required
                    id="fullName"
                    value={adminDetail.fullName}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border text-sm focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium text-xs">Username</label>
                  <input
                    type="text"
                    required
                    id="userName"
                    value={adminDetail.userName}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border text-sm focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 justify-between">
                <div className="w-full">
                  <label className="font-medium text-xs">Email</label>
                  <input
                    type="email"
                    required
                    id="email"
                    value={adminDetail.email}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border text-sm focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium text-xs">Phone Number</label>
                  <input
                    type="text"
                    required
                    id="phone"
                    value={adminDetail.phone}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border text-sm focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
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
                      <option disabled className="w-0">
                        select theme
                      </option>
                      <option value="light" defaultValue>
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
