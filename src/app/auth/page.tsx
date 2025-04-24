"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVendor } from "../context/VendorContext";

const Auth = () => {
  const { user, signup, login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { vendorLogin } = useVendor();

  console.log("Current user:", user);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      password: password,
      role: formData.get("role") as "user" | "vendor",
    };

    try {
      await signup(userData);
      router.push("/auth?tab=login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email-login") as string;
    const password = formData.get("password-login") as string;
  
    try {
      const [userResult, vendorResult] = await Promise.allSettled([
        login(email, password),
        vendorLogin(email, password),
      ]);
  
      console.log("User status:", userResult.status);
      console.log("Vendor status:", vendorResult.status);
  
      if (vendorResult.status === "fulfilled" && userResult.status === "rejected") {
        // Only vendor login succeeded
        router.push("/");
      } else if (userResult.status === "fulfilled" && vendorResult.status === "rejected") {
        // Only user login succeeded
        router.push("/");
      } else {
        // Either both failed or both succeeded (which should not happen)
        // setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Unexpected error occurred during login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center py-45 mt-10">
      <Tabs defaultValue="signup" className="w-[800px] rounded-none">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Log In</TabsTrigger>
        </TabsList>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <TabsContent value="signup" className="rounded-none">
          <Card>
            <form onSubmit={handleSignupSubmit}>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create a new account by filling in the details below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col md:flex-row gap-4 my-6">
                  <div className="space-y-1 w-full">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="rounded-none"
                      required
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 my-6">
                  <div className="space-y-1 w-full">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="rounded-none"
                      required
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      className="rounded-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 my-6">
                  <div className="space-y-1 w-full">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="rounded-none"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="rounded-none"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <form onSubmit={handleLoginSubmit}>
              <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1 my-6">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    name="email-login"
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-none"
                    required
                  />
                </div>
                <div className="space-y-1 my-6">
                  <Label htmlFor="password-login">Password</Label>
                  <Input
                    id="password-login"
                    name="password-login"
                    type="password"
                    placeholder="Enter your password"
                    className="rounded-none"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none w-full"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
