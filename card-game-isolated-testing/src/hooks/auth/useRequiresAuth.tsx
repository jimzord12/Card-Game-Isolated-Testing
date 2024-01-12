import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useRequireAuth() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user?.aT) {
      navigate("/");
      console.log(
        "⛔ Custom Error: User tried to go to Game while was UN-authenticated"
      );
    }
  }, [auth, navigate]);

  return auth;
}
