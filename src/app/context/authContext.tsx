"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  user: any;
  signup: (userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUserById: (id: string) => Promise<any>;
  updateUser: (id: string, userData: any) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Signup function
  const signup = async (userData: any) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      toast.success("Signup Successful! You can log in now.");
      router.push("/auth");
    } else {
      const data = await res.json();
      toast.error("Signup Failed!");
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Login Failed!");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth");
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      console.error("Failed to fetch user");
      logout(); // optional: clear token if invalid
    }
  };

  // Get a specific user by ID
  const getUserById = async (id: string) => {
    try {
      const res = await fetch(`/api/auth/signup/${id}`, {
        method: "GET",
      });
      const data = await res.json();

      if (res.ok) {
        return data.user;
      } else {
        toast.error("Failed to fetch user");
        return null;
      }
    } catch (err) {
      console.error("Get user error:", err);
      toast.error("Error fetching user");
    }
  };

  // Update a user
  const updateUser = async (id: string, userData: any) => {
    try {
      const res = await fetch(`/api/auth/signup/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        toast.success("User updated successfully");
      } else {
        const data = await res.json();
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      console.error("Update user error:", err);
      toast.error("Error updating user");
    }
  };

  // Delete a user
  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/auth/signup/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("User deleted successfully");
      } else {
        const data = await res.json();
        toast.error(data.error || "Delete failed");
      }
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error("Error deleting user");
    }
  };


  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, signup, login, logout, getUserById,
      updateUser,
      deleteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
