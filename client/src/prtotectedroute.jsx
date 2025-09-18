import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/user/verify", {
          withCredentials: true,
        });
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (authenticated === null) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/user/login" replace />;

  return children;
}
