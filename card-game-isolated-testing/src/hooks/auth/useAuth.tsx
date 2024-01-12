import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthProvider";

// Hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}
