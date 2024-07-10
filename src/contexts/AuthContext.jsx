import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the app loads
    const loggedIn = !!localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        Swal.fire({
          title: "Success!",
          text: "Logout successful!",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Logout failed. Please try again.",
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred during logout. Please try again.",
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
    }
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
