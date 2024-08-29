import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "Password must be at least 6 characters long",
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_CREATE_NEW_ADMIN_USER,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Account creation successful",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        }).then(() => {
          navigate("/admin/users");
          setFormData({
            name: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            role: "",
          });
        });
      } else {
        const errorMessage =
          result.message === "Email already in use"
            ? "The email is already in use"
            : "Account creation failed";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium text-xs">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-xs">Userame</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-xs">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-xs">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                />
              </div>
              <div className="relative">
                <label className="font-medium text-xs">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
                  placeholder="Password"
                  required
                />
                <div
                  className="absolute inset-y-[3.2rem] end-0 grid place-content-center cursor-pointer px-4"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Eye className="size-3.5 text-gray-400" />
                  ) : (
                    <EyeOff className="size-3.5 text-gray-400" />
                  )}
                </div>
              </div>
              <div>
                <div className="relative mx-auto my-5">
                  <label className="font-medium text-xs">Select Role</label>

                  <ChevronDown className="absolute top-8 bottom-0 w-5 h-5 my-auto text-gray-400 right-3" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-3 py-2 text-sm text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-gray-800 focus:ring-2"
                  >
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
              <button
                type="submit"
                className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:opacity-80 rounded-lg duration-150 text-sm"
              >
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
