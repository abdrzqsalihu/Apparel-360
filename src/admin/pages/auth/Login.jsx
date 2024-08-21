import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_ADMIN_AUTH, {
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

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);

        Swal.fire({
          title: "Success!",
          text: "Login successful",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        navigate("/admin/dashboard");
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred during login. Please try again.",
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600">
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
                Log in to access the dashboard
              </h3>
            </div>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="font-medium text-xs">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="font-medium text-xs">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg text-sm"
              />
            </div>

            <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:opacity-80 rounded-lg duration-150 text-sm">
              Login
            </button>
            <div className="text-center">
              <Link to="" className="text-gray-600 hover:text-gray-800 text-xs">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
