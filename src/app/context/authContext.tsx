"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  signup: (userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signup = async (userData: any) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      alert("Signup successful! You can log in now.");
      router.push("/auth");
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", { // Use a dedicated login route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const users = await res.json();
    
    const user = users.find((u: any) => u.email === email);
  
    
    
    if (user && (await bcrypt.compare(password, user.password))) {
      setUser(user);
      alert("Login successful!");
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
