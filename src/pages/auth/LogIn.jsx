import { AtSign, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_AUTH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email: email,
          password: password,
        }),
        credentials: "include", // Important for sessions to work
      });

      const result = await response.json();

      if (result.success) {
        // Login successful, redirect or perform actions
        Swal.fire({
          title: "Success!",
          text: result.message,
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        navigate("/shop");
        login(); // Call login function to update the auth state
      } else {
        // Login failed, show error message
        Swal.fire({
          title: "Error!",
          text: result.message,
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Login error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred during login. Please try again.",
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="px-6">
      <div className="w-full py-20">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-[1.7rem]">Welcome back!</h1>
          <p className="text-sm mt-4 text-gray-500">
            Manage your account by logging in.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-10 max-w-md space-y-7"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AtSign className="size-4 text-gray-400" />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
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
              Log in
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            No account?
            <Link className="underline ml-2" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
