import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Example check

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/auth/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
}

export default useAuth;
