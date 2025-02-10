import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AuthContext = createContext(null);

// Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// 🔑 AuthProvider using TanStack Query
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch User Function
  const fetchUser = async () => {
    const { data } = await axios.get("http://localhost:8080/auth/me", {
      withCredentials: true,
    });
    console.log("user",data.user)
    return data.user;
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false, // Don't retry on auth failure
    staleTime: 1000 * 60 * 5, // Cache user for 5 minutes
  });

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) =>
      axios.post("http://localhost:8080/auth/login", credentials, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]); // Refresh user after login
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: async () =>
      axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null); // Clear user data on logout
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
