import { AtSign, Eye, EyeOff, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

/* eslint-disable react/no-unescaped-entities */
function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password length
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

    const response = await fetch(import.meta.env.VITE_REACT_APP_AUTH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(formData),
      body: JSON.stringify({ ...formData, action: "register" }),
      credentials: "include", // This is important to include cookies
    });
    const result = await response.json();
    if (result.success) {
      // alert("Registration successful");
      Swal.fire({
        title: "Success!",
        text: "Registration successful!",
        icon: "success",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      }).then(() => {
        // Redirect to product page after successful registration
        navigate("/shop");
        login(); // Call login function to update the auth state
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } else {
      if (result.message === "Email already registered") {
        // alert("Email already registered. Please use a different email.");
        Swal.fire({
          title: "Error!",
          text: "Email already registered",
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      } else {
        // alert("Registration failed. Please try again later.");
        Swal.fire({
          title: "Error!",
          text: "Registration failed. Please try again.",
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-10 max-w-md space-y-7"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Full name"
                required
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Email address"
                required
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Password"
                required
              />

              <div
                className="absolute inset-y-0 end-0 grid place-content-center cursor-pointer px-4"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <Eye className="size-4 text-gray-400" />
                ) : (
                  <EyeOff className="size-4 text-gray-400" />
                )}
              </div>
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
